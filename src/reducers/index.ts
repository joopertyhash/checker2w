import { History } from "history";
import { combineReducers } from "redux";
import { Todo } from "../model";
import * as todoReducer from "./todo";
import * as searchAddressReducer from "./searchAddress";

export interface RootState {
	todoList: Todo[];
	Addresses: string[];
}

export default (history: History) =>
	combineReducers({
		...todoReducer,
		...searchAddressReducer,
	});
