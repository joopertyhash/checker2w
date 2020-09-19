export enum AddressActions {
	SEARCH_ADDRESS_LOADING = "SEARCH_ADDRESS_LOADING",
	SEARCH_ADDRESS_SUCCESS = "SEARCH_ADDRESS_SUCCESS",
	SEARCH_ADDRESS_ERROR = "SEARCH_ADDRESS_ERROR",
}

interface AddressActionType<T, P> {
	type: T;
	payload: P;
}

export interface AddressData {
	balance: string;
}

export type AddressAction =
	| AddressActionType<typeof AddressActions.SEARCH_ADDRESS_LOADING, String>
	| AddressActionType<
			typeof AddressActions.SEARCH_ADDRESS_SUCCESS,
			AddressData
	  >
	| AddressActionType<typeof AddressActions.SEARCH_ADDRESS_ERROR, String>;
