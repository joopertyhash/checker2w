import { AddressActions, AddressData } from "../model";
import createReducer from "./createReducer";

const initialState = {
	isLoading: false,
	hasError: false,
	balance: "",
	transactions: [],
	address: "",
	previousSearches: [],
};

export type addressDataState = AddressData & {
	isLoading: boolean;
	hasError: boolean;
	previousSearches: string[];
};

export const addresses = createReducer<addressDataState>(initialState, {
	[AddressActions.SEARCH_ADDRESS_LOADING](state: addressDataState) {
		return { ...state, isLoading: true, hasError: false };
	},
	[AddressActions.SEARCH_ADDRESS_SUCCESS](
		state: addressDataState,
		action: { payload: AddressData }
	) {
		return {
			...state,
			isLoading: false,
			hasError: false,
			balance: action.payload.balance,
			address: action.payload.address,
			transactions: action.payload.transactions,
		};
	},
	[AddressActions.SEARCH_ADDRESS_ERROR](state: addressDataState) {
		return { ...state, hasError: true };
	},
	[AddressActions.ADD_ADDRESS_SEARCH](
		state: addressDataState,
		action: { payload: string }
	) {
		const newPreviousSearches = [action.payload]
			.concat(state.previousSearches)
			.slice(0, 5);

		return { ...state, previousSearches: newPreviousSearches };
	},
});
