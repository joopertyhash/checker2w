import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

export const validation = {
	isAddress: (address: string) => web3.utils.isAddress(address),
};
