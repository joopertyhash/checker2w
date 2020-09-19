import { AddressActions } from "../model";
import { E_NETWORKS } from "../constants/networks";
import { ErrorService } from "../services/ErrorService";
import ApiService from "../services/ApiService";

interface SearchAddressInput {
	address: string;
	network: E_NETWORKS;
}

export function searchAddress({ address, network }: SearchAddressInput) {
	return async (dispatch: Function, getState: Function) => {
		dispatch({
			type: AddressActions.SEARCH_ADDRESS_LOADING,
			payload: address,
		});

		dispatch({
			type: AddressActions.ADD_ADDRESS_SEARCH,
			payload: address,
		});

		try {
			const value = await ApiService.fetchAddressData(address, network);

			dispatch({
				type: AddressActions.SEARCH_ADDRESS_SUCCESS,
				payload: {
					balance: value.balance,
					transactions: value.transactions,
					address: value.address,
				},
			});
		} catch (err) {
			dispatch({
				type: AddressActions.SEARCH_ADDRESS_ERROR,
			});
			ErrorService.handleError(err);
		}
	};
}
