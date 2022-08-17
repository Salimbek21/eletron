export interface Filter {
    price?: {
        min: number,
        max: number
    },
    brands?: [
        {
            id: number,
            name: string
        }
    ],
    features?: [
        {
            name: string,
            values: [
                {
                    id: number,
                    value: string,
                    disabled: number,
                    color: string
                }
            ]
        }
    ]
}

export interface FilterState {
    filters: Filter
}

export enum FilterActionTypes {
    FETCH_FILTERS = "FETCH_FILTERS"
}


interface FetchFiltersAction {
    type: FilterActionTypes.FETCH_FILTERS,
    payload: Filter
}

// Combines all actions
export type FilterAction = FetchFiltersAction
