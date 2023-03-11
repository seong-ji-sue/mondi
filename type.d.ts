declare namespace Client {
  interface IBanner {
    url: string;
  }
  
  interface IProduct {
    id: number;
    title: string;
    cost: number;
    discountCost: number;
    numOfPeople: number;
    state: number;
    detailContent: string;
    companyName: string;
    companyMapUrl: string;
    company?: ICompany;
    categories?: ICategory[];
    images: IImage[];
    regionDepth1?: IRegion;
    regionDepth2?: IRegion;
    regionDepth3?: IRegion;
  }

  interface ICategory {
    id: number | null;
    name: string;
    imgUrl?: string;
  }

  interface IRegion {
    id: number | null;
    name: string;
    regionDepth2: {
      name: string;
      regionDepth1: {
        name: string;
      }
    }
  }

  interface ICompany {
    name: string
  }

  interface IImage {
    url: string;
  }
}

declare namespace Server {

}