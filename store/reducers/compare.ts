import {CompareAction, CompareActionTypes, CompareState} from "../types/compare";

const initialState: CompareState = {
    compared: false,
    compareFeatures: [],
    compareProducts: [],
    classes: []
};

const compareReducer = (state = {...initialState}, action: CompareAction
): CompareState => {
    switch (action.type) {
        case CompareActionTypes.FETCH_COMPARE:
            return {
                ...state,
                compareProducts: action.payload.products,
                compareFeatures: action.payload.features
            };
        case CompareActionTypes.TOGGLE_COMPARE:
            return {...state, compared: action.payload};

        case CompareActionTypes.FETCH_COMPARE_CLASSES:
            return {...state, classes: action.payload}

        default:
            return state;
    }
};

export default compareReducer;
