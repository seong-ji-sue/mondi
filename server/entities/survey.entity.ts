import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import CommonEntity from "./common";
import User from "./user.entity";

export enum surveyStates {
  ACTIVE = "ACTIVE",
  FAIL = "FAIL",
  FINISHED = "FINISHED"
};

@Entity("survey")
export default class Survey extends CommonEntity {
  // item
  @Column("enum", {enum: surveyStates, comment: "투표 상태"})
  state: surveyStates = surveyStates.ACTIVE;

  @Column("varchar", { length: 22, comment: "브랜드명" })
  brandName: string = "";

  @Column("int", { default: 0, comment: "목표 인원" })
  targetCounts: number = 0;

  @Column("varchar", { length: 30, comment: "상품명"})
  itemName: string = "";

  @Column("varchar", { length: 50, comment: "상품 보충 설명" })
  itemDescription: string = "";

  @Column("int", { default: 0, comment: "판매가격" })
  price: number = 0;

  @Column("int", { default: 0, comment: "판매가격" })
  targetPrice: number = 0;

  @Column("datetime", { comment: "투표 시작 날짜" })
  surveyStartDate: Date | "" = "";

  @Column("datetime", { comment: "투표 종료 날짜" })
  surveyEndDate: Date | "" = "";

  @Column("json", { comment: "핵심 포인트" })
  pointDescriptions: string[] = [];

  // details
  @Column("varchar", { length: 22, comment: "상세페이지 요약 제목" })
  detailTitle: string = "";

  @Column("varchar", { length: 50, comment: "상세페이지 요약 설명" })
  detailDescription: string = "";

  @Column("varchar", { length: 50, comment: "MD 기획 의도" })
  detailMdPlan: string = "";

  // images

  @Column("varchar", { length: 256, comment: "리스트 썸네일 이미지" })
  listThumbnailImage: string = "";

  @Column("varchar", { length: 256, comment: "투표함 썸네일 이미지" })
  surveyBoxThumbnailImage: string = "";

  @Column("varchar", { length: 256, comment: "상단 메인 배너 이미지" })
  heroImage: string = "";

  @Column("json", { comment: "상세 이미지" })
  detailImages: [string, string] | [] = []; 

  @ManyToMany(() => User, (user) => user.surveys)
  @JoinTable({name: "survey_users"})
  users: User[];
}