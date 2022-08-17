import {httpGet} from "./index";

export const API_Banners = () => httpGet({
   url: '/api/banners'
})