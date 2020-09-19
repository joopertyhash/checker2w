// prettier-ignore
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import * as React from "react";
import { useActions } from "../../actions";
import { E_NETWORKS } from "../../constants/networks";
import { AddressField } from "./AddressField";
import { NetworkFeild } from "./NetworkField";
import * as AddressActions from "../../actions/address";

interface Props {}

export function TransactionSearchForm(props: Props) {
	// const [address, setAddress] = React.useState("");
	const [address, setAddress] = React.useState(
		"0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
	);
	const [hasError, setHasError] = React.useState(false);
	const [network, setNetwork] = React.useState(E_NETWORKS.Rinkeby);
	const addressActions = useActions(AddressActions);

	const handleSubmit = () => {
		addressActions.startSearchAddress({ address, network });
	};

	return (
		<>
			<Typography variant="h6" gutterBottom>
				Address
			</Typography>
			<AddressField
				onChange={setAddress}
				value={address}
				hasError={hasError}
				onError={setHasError}
			/>

			<Typography variant="h6" gutterBottom>
				Network
			</Typography>
			<NetworkFeild onChange={setNetwork} value={network} />

			<p>{address}</p>
			<p>{network}</p>
			<Button
				color="secondary"
				onClick={handleSubmit}
				variant="contained"
			>
				Search
			</Button>
		</>
	);
}

const useStyles = makeStyles({
	textField: {
		width: "80%",
		margin: 20,
	},
});
