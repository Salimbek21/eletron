import {httpGet} from "./index";

export const API_Search = (search: string, page: number) => httpGet({
   url: '/api/search',
   params: {
      search,
      page,
      shop: 1
   }
})