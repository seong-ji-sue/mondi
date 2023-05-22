import { pick } from "lodash";
import User from "../../server/entities/user.entity";
import Survey, { surveyStates } from "../../server/entities/survey.entity";

export class SurveyDTO extends Survey {
  constructor(survey: Survey) {
    super();
    Object.assign(this, survey);
  }
  
  isEntered: boolean = false;
};

type SurveyListDTOType = Pick<Survey, "id" | "state" | "brandName" | "itemName" | "itemDescription" | "price" | "targetPrice" | "users">
export class SurveyListDTO implements SurveyListDTOType {
  constructor(survey: Survey) {
    Object.assign(this, pick(survey, ['id', 'state', 'brandName', 'itemName', 'itemDescription', 'listThumbnailImage', 'price', 'targetPrice', 'users']));
  }

  id: number;
  state: surveyStates;
  brandName: string;
  itemName: string;
  itemDescription: string;
  listThumbnailImage: string;
  price: number;
  targetPrice: number;
  users: User[];
  isEntered: boolean = false;
}

type MySurveyListDTOType = Omit<SurveyListDTOType, "price" | "targetPrice" | "users">;
export class MySurveyListDTO implements MySurveyListDTOType {
  constructor(survey: Survey) {
    Object.assign(this, pick(survey, ['id', 'state', 'brandName', 'itemName', 'itemDescription', 'listThumbnailImage']));
  }

  id: number;
  state: surveyStates;
  brandName: string;
  itemName: string;
  itemDescription: string;
  listThumbnailImage: string;
}
