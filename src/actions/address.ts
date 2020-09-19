import { AddressActions, AddressAction } from "../model";
import { E_NETWORKS } from "../constants/networks";
import ApiService from "../services/ApiService";

interface SearchAddressInput {
	address: string;
	network: E_NETWORKS;
}

export function startSearchAddress({ address, network }: SearchAddressInput) {
	// SearchAddress({
	// 	address,
	// 	network,
	// });

	return async (dispatch: Function, getState: Function) => {
		dispatch({
			type: AddressActions.SEARCH_ADDRESS_LOADING,
			payload: address,
		});

		let value = "";
		let hasError = false;

		try {
			value = await ApiService.fetchAddressData(address, network);
			console.log("result == ", value);

			dispatch({
				type: AddressActions.SEARCH_ADDRESS_SUCCESS,
				payload: {
					balance: value,
				},
			});
		} catch (err) {
			hasError = true;
		}
	};

	// return {
	// 	type: AddressActions.SEARCH_ADDRESS_LOADING,
	// 	payload: address,
	// };
}

function SearchAddress({ address, network }: SearchAddressInput) {
	return async (dispatch: Function, getState: Function) => {
		let value = "";
		let hasError = false;
		try {
			value = await ApiService.fetchAddressData(address, network);
			console.log("result == ", value);

			dispatch({
				type: AddressActions.SEARCH_ADDRESS_SUCCESS,
				payload: {
					balance: value,
				},
			});
		} catch (err) {
			hasError = true;
		}
	};
}
