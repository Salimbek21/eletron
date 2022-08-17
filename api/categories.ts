import { httpGet, httpPost } from "./index";

export const API_fetchCategories = () =>
   httpGet({
      url: "/api/categories",
   });

export const API_filter_category_products = (params: any) =>
   httpGet({
      url: "/api/products",
      params: {
         page: 1,
         per_page: 36,
         ...params,
      },
   });
