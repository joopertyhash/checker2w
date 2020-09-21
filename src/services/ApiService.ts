import { E_NETWORKS } from "../constants/networks";
import { ErrorService } from "./ErrorService";
import { AddressData } from "../model";
import { E_API_ENDPOINTS, NO_API_KEY_THROTTLE } from "../constants/api";

const getNetworkApiUrl = (network: E_NETWORKS) => {
	let apiUrl = "";
	switch (network) {
		case E_NETWORKS.Rinkeby:
			apiUrl = E_API_ENDPOINTS.Rinkeby;
			break;
		case E_NETWORKS.Manynet:
			apiUrl = E_API_ENDPOINTS.Manynet;
			break;
		default:
			apiUrl = "";
	}

	return apiUrl;
};

const fetchBalance = (apiUrl: string, address: string) => {
	return fetch(`${apiUrl}&action=balance&address=${address}`);
};

const fetchTransactions = (
	apiUrl: string,
	address: string
): Promise<Response> => {
	// TODO: add API key since parallel request is not allowed by api
	return new Promise((resolve, _) => {
		setTimeout(() => {
			resolve(
				fetch(`${apiUrl}&action=txlist&sort=desc&address=${address}`)
			);
		}, NO_API_KEY_THROTTLE);
	});
};

const fetchFullAddressData = (address: string, network: E_NETWORKS) => {
	const apiUrl = getNetworkApiUrl(network);
	const balance = fetchBalance(apiUrl, address);
	const transactions = fetchTransactions(apiUrl, address);

	return Promise.all([balance, transactions]);
};

const formatLastTransactions = (transactions: Array<{ value: string }>) => {
	let transactionsArray = [] as string[];
	if (Array.isArray(transactions)) {
		transactionsArray = transactions.slice(0, 5).map((tran) => tran.value);
	}

	return transactionsArray;
};

export default {
	fetchAddressData: async (
		address: string,
		network: E_NETWORKS
	): Promise<AddressData> => {
		try {
			const [
				balancePromise,
				transactionsPromise,
			] = await fetchFullAddressData(address, network);

			const balance = await balancePromise.json();
			const transactions = await transactionsPromise.json();
			const response = {
				balance: balance.result,
				transactions: formatLastTransactions(transactions.result),
				address: address,
			};
			console.log(121212, response);
			return response;
		} catch (err) {
			ErrorService.handleError(err);

			const response = {
				balance: "unknown",
				transactions: [],
				address: address,
			};

			return response;
		}
	},
};
