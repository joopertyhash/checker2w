import { History } from "history";
import { combineReducers } from "redux";
import * as addressesReducer from "./addresses";

export interface RootState {
	addresses: addressesReducer.addressDataState;
}

export default (history: History) =>
	combineReducers({
		...addressesReducer,
	});
