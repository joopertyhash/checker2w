import { E_NETWORKS } from "../constants/networks";
import { ErrorService } from "./ErrorService";
import { AddressData } from "../model";

const getNetworkApiUrl = (network: E_NETWORKS) => {
	let apiUrl = "";
	switch (network) {
		case E_NETWORKS.Rinkeby:
			apiUrl = "https://api-rinkeby.etherscan.io/api?module=account";
			break;
		case E_NETWORKS.Manynet:
			apiUrl = "https://api.etherscan.io/api?module=account";
			break;
		default:
			apiUrl = "";
	}

	return apiUrl;
};

const fetchBalance = (apiUrl: string, address: string) => {
	return fetch(`${apiUrl}&action=balance&address=${address}`);
};

const fetchTransactions = (apiUrl: string, address: string) => {
	return fetch(`${apiUrl}&action=txlist&sort=desc&address=${address}`);
};

const fetchFullAddressData = (address: string, network: E_NETWORKS) => {
	const apiUrl = getNetworkApiUrl(network);
	const balance = fetchBalance(apiUrl, address);
	const transactions = fetchTransactions(apiUrl, address);

	return Promise.all([balance, transactions]);
};

const formatLastTransactions = (transactions: Array<{ value: string }>) => {
	return transactions.slice(0, 5).map((tran) => tran.value);
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
