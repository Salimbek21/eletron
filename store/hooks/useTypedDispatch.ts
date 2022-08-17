import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ActionCreators from "../actions"

// Instead of using Dispatch every time we can combine them to useTypedDispatch
export const useTypedDispatch = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}