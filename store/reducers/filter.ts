import {FilterAction, FilterActionTypes, FilterState} from "../types/filter"

const initialState: FilterState = {
    filters: {}
}

const filterReducer = (state = {...initialState}, action: FilterAction): FilterState => {
    switch (action.type) {
        case FilterActionTypes.FETCH_FILTERS:
            return {...state, filters: action.payload}

        default:
            return state
    }
}

export default filterReducer