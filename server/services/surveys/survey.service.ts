import { dataSource } from "../../";
import Survey from "../../../server/entities/survey.entity";
import { isEmpty } from "lodash";
import { SurveyDTO } from "../../../server/dtos/survey.dto";

export const getSurveys = async ({page = 1, limit = 10, userId = -1}) => {
  const result: {[key: string]: any} = {
    surveys: [],
    totalCount: 0,
    totalPage: 0,
    page,
    limit
  };

  const surveyRepository = dataSource.getRepository(Survey);
  const surveys = await surveyRepository.find({
    take: limit,
    skip: (page - 1) * limit,
    select: ["brandName", "itemName", "itemDescription", "price", "targetPrice", "listThumbnailImage"],
    relations: ['users'],
    relationLoadStrategy: "query"
  })
    .then(r => r.map(survey => new SurveyDTO(survey)));

  if (isEmpty(surveys)) {
    return result;
  } else {
    result.surveys.push([
      ...surveys.map((s) => {
          s.isDone = s.users.some(user => user.id === userId)
      })
    ]);
  }

  if (page === 1) {
    result.totalCount = await surveyRepository.count();
    result.totalPage = Math.ceil(result.totalCount / limit);
  }

  return result;
};

export const getSurvey = async ({surveyId = -1, userId = -1}) => {
  const surveyRepository = dataSource.getRepository(Survey);
  const data = await surveyRepository.findOne({
    where: {id: surveyId},
    relations: ["users"],
    relationLoadStrategy: "query"
  })
  
  if (!data) {
    throw 404;
  }

  const survey = new SurveyDTO(data);
  survey.isDone = survey.users.some(user => user.id === userId);
  return survey;
};

export const enterSurvey = async ({surveyId = -1, userId = -1}) => {

};