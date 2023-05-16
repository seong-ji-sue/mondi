import Survey from "../../server/entities/survey.entity";

export class SurveyDTO extends Survey {
  constructor(survey: Survey) {
    super();
    Object.assign(this, survey);
  }
  
  isDone: boolean = false;
};