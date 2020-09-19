import { AddressActions, AddressAction, AddressData } from "../model";
import createReducer from "./createReducer";

const initialState = {
	isLoading: false,
	balance: "0",
};

type addressDataState = AddressData & { isLoading: boolean };

export const addressData = createReducer<addressDataState>(initialState, {
	[AddressActions.SEARCH_ADDRESS_LOADING](state: AddressData) {
		return { ...state, isLoading: true };
	},
	[AddressActions.SEARCH_ADDRESS_SUCCESS](
		state: AddressData,
		action: { payload: AddressData }
	) {
		return {
			...state,
			isLoading: false,
			balance: action.payload.balance,
		};
	},
});
