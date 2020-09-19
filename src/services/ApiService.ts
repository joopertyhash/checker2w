import { E_NETWORKS } from "../constants/networks";

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

export default {
	fetchAddressData: async (
		address: string,
		network: E_NETWORKS
	): Promise<string> => {
		const apiUrl = getNetworkApiUrl(network);

		try {
			const response = await fetch(
				`${apiUrl}&action=balance&address=${address}`
			);

			const value = await response.json();
			return value.result;
		} catch (err) {
			console.log(err);
			return "";
		}
	},
};
