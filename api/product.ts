import {httpGet} from "./index";

export const API_FetchSimilarProds = (product_id: number) => httpGet({
    url: '/api/products/similar',
    params: {
        product_id,
        per_page: 5
    }
})