import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../reducers/root";
// Wraps normal useSelector to typescript understandable syntax
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector