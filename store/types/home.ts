export interface Brand {
   id: number;
   name: string;
   image?: {
      url?: string;
   };
}

export interface SectionProducts {
   id: number;
   slug: string;
   name: string;
   images: [
      {
         url?: string;
         types?: {
            home_default?: string;
            large_default?: string;
            small_default?: string;
         };
      }
   ];
   is_new: number;
   is_in_comparison: number;
   is_in_cart: number;
   favorite: number;
   random_shop: {
      item_shop_id: number;
      quantity: number;
      price: number;
   };
   brand?: {
      name?: string
   };
   class?: {
      name?: string
   }
}

// Typescript state for reducer
export interface HomeState {
   brands: Brand[];
   popularProducts: SectionProducts[];
   newProducts: SectionProducts[];
   recommendedProducts: SectionProducts[];
   weekProducts: SectionProducts[];
   ploading: boolean;
   nloading: boolean;
   rloading: boolean;
   wloading: boolean;
}

export enum HomeActionTypes {
   FETCH_BRANDS = "FETCH_BRANDS",
   FETCH_SECTION_PRODUCTS = "FETCH_SECTION_PRODUCTS",
}

// For each action we need to create new action type and specify its payload
interface FetchBrandsAction {
   type: HomeActionTypes.FETCH_BRANDS;
   payload: Brand[];
}

interface FetchSectionProdsAction {
   type: HomeActionTypes.FETCH_SECTION_PRODUCTS;
   payload: {
      products: SectionProducts[];
      loading: boolean;
      type: string;
   };
}

// Combines all actions
export type HomeAction = FetchBrandsAction | FetchSectionProdsAction;
