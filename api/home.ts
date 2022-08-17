import {httpGet} from "./index";

export const API_HOME = (type = '', group = '') => httpGet({
    url: '/api/home',
    params: {
        type,
        group
    }
})

export const API_HOME_Brands = () => httpGet({
    url: '/api/brands'
})