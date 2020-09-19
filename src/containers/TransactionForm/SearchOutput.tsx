import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemText,
	CardActions,
	Button,
	Dialog,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

import { AddressData } from "../../model";
import { QRDialog } from "./QRDialog";

interface Props {
	value: AddressData;
}

const parseBalance = (balance: string) => {
	const value = parseInt(balance);
	return isNaN(value) ? "balance unknown" : value;
};

export function SearchOutput(props: Props) {
	const classes = useStyles();

	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	const handleClick = () => {
		setIsDialogOpen(true);
	};

	const handleClose = () => {
		setIsDialogOpen(false);
	};

	return (
		<>
			<Card className={classes.root} variant="outlined">
				<CardContent>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Search result
					</Typography>

					<Typography
						className={classes.pos}
						variant="h5"
						component="h2"
					>
						Balance: {parseBalance(props.value.balance)}
					</Typography>

					<Typography color="textSecondary">Address:</Typography>

					<Button onClick={handleClick}>
						<Typography
							className={classes.pos}
							variant="subtitle2"
							color="textPrimary"
						>
							{props.value.address}
						</Typography>
					</Button>

					<Typography className={classes.pos} color="textSecondary">
						Last Transactions:
					</Typography>
					<List dense>
						{props.value.transactions.map((item, index) => (
							<ListItem key={`result-${item}-${index}`}>
								<ListItemText
									primary={item}
									primaryTypographyProps={{
										variant: "subtitle2",
									}}
								/>
							</ListItem>
						))}
					</List>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={handleClick}>
						Get QR code
					</Button>
				</CardActions>
			</Card>
			<Dialog
				open={isDialogOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<QRDialog value={props.value.address} />
			</Dialog>
		</>
	);
}

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	clickableAddress: {
		padding: 0,
		display: "flex",
		justifyContent: "flex-start",
	},
});
