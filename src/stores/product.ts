import create from "zustand";

export const defaultRegions: Client.IRegion[] = [{ id: null, name: "전체", regionDepth2: { name: "", regionDepth1: { name: "" } } }];
export const defaultCategories: Client.ICategory[] = [{ id: null, name: "전체" }];


interface IProductState {
  banners: Client.IBanner[];
  regions: Client.IRegion[];
  selectedRegion: Client.IRegion;
  categories: Client.ICategory[];
  selectedCategory: Client.ICategory;
  products: Client.IProduct[];
  recruitChecked: boolean;
}

const productState: IProductState = {
  banners: [],
  regions: defaultRegions,
  selectedRegion: defaultRegions[0],
  categories: defaultCategories,
  selectedCategory: defaultCategories[0],
  products: [],
  recruitChecked: false
}

const useProductStore = create(() => productState);

export default useProductStore;