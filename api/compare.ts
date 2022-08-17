import {httpGet, httpPost} from "./index";

export const API_FetchCompare = (class_id: number | undefined) => {
    let url = "/api/comparison/features"
    if (class_id) {
        url += `?class_id=${class_id}`
    }
    return  httpGet({url})
};

export const API_FetchCompareClasses = () =>  httpGet({
    url: '/api/comparison/classes'
})

export const API_ToggleComparison = (product_id: number) =>
    httpPost({
        url: "/api/comparison/toggle",
        data: {
            product_id
        },
    });