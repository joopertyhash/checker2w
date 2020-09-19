// prettier-ignore
import { Button, Typography, Snackbar, Grid} from "@material-ui/core";
import { useSelector } from "react-redux";

import * as React from "react";
import { RootState } from "../../reducers";
import { useActions } from "../../actions";
import { E_NETWORKS } from "../../constants/networks";
import { AddressField } from "./AddressField";
import { NetworkFeild } from "./NetworkField";
import * as AddressActions from "../../actions/address";
import { PreviousSearches } from "./PreviousSearches";
import { SearchOutput } from "./SearchOutput";

interface Props {}

export function TransactionSearchForm(props: Props) {
	const [address, setAddress] = React.useState("");
	const [hasInputError, setHasInputError] = React.useState(false);
	const [network, setNetwork] = React.useState(E_NETWORKS.Rinkeby);

	const addressData = useSelector((state: RootState) => state.addresses);
	const addressActions = useActions(AddressActions);

	const handleSubmit = () => {
		addressActions.searchAddress({ address, network });
	};

	const handlePreviousSearchClick = (value: string) => {
		setAddress(value);
	};

	return (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<Typography variant="h6" gutterBottom>
					Address
				</Typography>
				<AddressField
					onChange={setAddress}
					value={address}
					hasError={hasInputError}
					onError={setHasInputError}
				/>

				<PreviousSearches
					values={addressData.previousSearches}
					onClick={handlePreviousSearchClick}
				/>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="h6" gutterBottom>
					Network
				</Typography>
				<NetworkFeild onChange={setNetwork} value={network} />
			</Grid>

			<Grid item xs={12}>
				<Button
					color="secondary"
					onClick={handleSubmit}
					variant="contained"
				>
					Search
				</Button>
			</Grid>

			<Grid item xs={12}>
				{addressData.balance && !addressData.hasError ? (
					<SearchOutput value={addressData} />
				) : null}
				<Snackbar
					open={addressData.hasError}
					message="Error loading data"
					key={"error-account-loading"}
				/>
			</Grid>
		</Grid>
	);
}
