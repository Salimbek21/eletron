import {httpGet} from "./index";


export const API_FetchPosts = () => httpGet({
   url: '/api/posts/',
   params: {
      per_page: 9
   }
})

