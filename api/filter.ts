import {httpGet} from "./index";

export const API_fetchFilters = (params: any) => httpGet({
    url: '/api/filter/options',
    params
})