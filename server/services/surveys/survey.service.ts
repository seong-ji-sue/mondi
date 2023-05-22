import { dataSource } from "../../";
import Survey, { surveyStates } from "../../../server/entities/survey.entity";
import User from "../../../server/entities/user.entity";
import { isEmpty, omit } from "lodash";
import { MySurveyListDTO, SurveyDTO, SurveyListDTO } from "../../../server/dtos/survey.dto";

export const getSurveys = async ({page, limit, userId}: {page: number, limit: number, userId: number}) => {
  const result: {[key: string]: any} = {
    surveys: [],
    page,
    limit
  };

  const surveyRepository = dataSource.getRepository(Survey);
  const surveys = await surveyRepository.find({
    where: {state: surveyStates.ACTIVE},
    take: limit,
    skip: (page - 1) * limit,
    select: ["id", "brandName", "itemName", "itemDescription", "price", "targetPrice", "listThumbnailImage"],
    relations: ['users'],
    relationLoadStrategy: "query"
  })
    .then(r => r.map(survey => new SurveyListDTO(survey)));

  if (isEmpty(surveys)) {
    return result;
  } else {
    result.surveys.push([
      ...surveys.map((s) => {
          s.isEntered = s.users.some(user => user.id === userId)
          return omit(s, "users");
      })
    ]);
  }

  if (page === 1) {
    result.totalCount = await surveyRepository.count();
    result.totalPage = Math.ceil(result.totalCount / limit);
  }
  
  return result;
};

export const getSurvey = async ({surveyId, userId}: {surveyId: number, userId: number}) => {
  const surveyRepository = dataSource.getRepository(Survey);
  const data = await surveyRepository.findOne({
    where: {
      id: surveyId,
      state: surveyStates.ACTIVE
    },
    relations: ["users"],
    relationLoadStrategy: "query",
  });
  
  if (!data) {
    return;
  }

  const survey = new SurveyDTO(data);
  survey.isEntered = survey.users.some(user => user.id === userId);
  return survey;
};

export const checkUserEnteredSurvey = async ({surveyId, userId}: {surveyId: number, userId: number}) => {
  const surveyRepository = dataSource.getRepository(Survey);
  const queryBuilder = surveyRepository.createQueryBuilder("survey")
    .leftJoinAndSelect("survey.users", "user")
    .where("survey.id = :surveyId", { surveyId })
    .andWhere('user.id = :userId', { userId });

  return !isEmpty(await queryBuilder.getOne());
};

export const enterSurvey = async ({survey, user}: {survey: Survey, user: User}) => {
  const surveyRepository = dataSource.getRepository(Survey);
  survey.users = [...(survey.users || []), user];
  
  const userEnteredSurvey = new SurveyDTO((await surveyRepository.save([survey]))?.[0] || {});
  userEnteredSurvey.isEntered = userEnteredSurvey.users.some(u => u.id === user.id);
  
  return userEnteredSurvey;
};

export const quitSurvey = async ({surveyId, userId}: {surveyId: number, userId: number}) => {
  const surveyRepository = dataSource.getRepository(Survey);
  await surveyRepository
    .createQueryBuilder()
    .relation(Survey, "users")
    .of(surveyId)
    .remove(userId);
};

export const getUserSurveys = async ({page, limit, userId}: {page: number, limit: number, userId: number}) => {
  const result: {[key: string]: any} = {
    surveys: [],
    page,
    limit
  };

  const surveyRepository = dataSource.getRepository(Survey);
  const queryBuilder = surveyRepository.createQueryBuilder("survey")
    .leftJoinAndSelect("survey.users", "user")
    .where('user.id = :userId', { userId })
    .select(["survey.id", "survey.brandName", "survey.itemName", "survey.itemDescription", "survey.listThumbnailImage"])
    
  if (page === 1) {
    result.totalCount = await queryBuilder.getCount();
    result.totalPage = Math.ceil(result.totalCount / limit);
  }

  result.surveys = await queryBuilder
    .skip((page - 1) * limit)
    .limit(limit)
    .getMany()
    .then(r => r.map(survey => new MySurveyListDTO(survey)));
    
  return result;
};