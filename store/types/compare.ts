import {Product} from "./product";

interface CompareClass {
    name: string,
    id: number
}

interface CompareProduct extends Product {
    class: CompareClass
}

interface FeatureValue {
    feature_value_id: number,
    product_id: number,
    value: string | null
}

export interface CompareFeature {
    id: number,
    name: string,
    values: FeatureValue[]
}

export interface CompareState {
    compareFeatures: CompareFeature[]
    compareProducts: CompareProduct[],
    compared: boolean,
    classes: CompareClass[]
}

export enum CompareActionTypes {
    FETCH_COMPARE = "FETCH_COMPARE",
    TOGGLE_COMPARE = "TOGGLE_COMPARE",
    FETCH_COMPARE_CLASSES = "FETCH_COMPARE_CLASSES"
}

interface FetchCompareAction {
    type: CompareActionTypes.FETCH_COMPARE,
    payload: {
        features: CompareFeature[],
        products: CompareProduct[]
    }
}

interface FetchCompareClassesAction {
    type: CompareActionTypes.FETCH_COMPARE_CLASSES,
    payload: CompareClass[]
}

interface ToggleCompareAction {
    type: CompareActionTypes.TOGGLE_COMPARE,
    payload: boolean
}

export type CompareAction = FetchCompareAction | ToggleCompareAction | FetchCompareClassesAction