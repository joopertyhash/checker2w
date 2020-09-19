export enum AddressActions {
	SEARCH_ADDRESS_LOADING = "SEARCH_ADDRESS_LOADING",
	SEARCH_ADDRESS_SUCCESS = "SEARCH_ADDRESS_SUCCESS",
	SEARCH_ADDRESS_ERROR = "SEARCH_ADDRESS_ERROR",
	ADD_ADDRESS_SEARCH = "ADD_ADDRESS_SEARCH",
}

interface AddressActionType<T, P> {
	type: T;
	payload: P;
}

export interface AddressData {
	balance: string;
	transactions: string[];
	address: string;
}

export type AddressAction =
	| AddressActionType<typeof AddressActions.SEARCH_ADDRESS_LOADING, String>
	| AddressActionType<
			typeof AddressActions.SEARCH_ADDRESS_SUCCESS,
			AddressData
	  >
	| AddressActionType<typeof AddressActions.SEARCH_ADDRESS_ERROR, String>
	| AddressActionType<typeof AddressActions.ADD_ADDRESS_SEARCH, String>;
