import { Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { TransactionSearchForm } from "../containers";

export function TransactionsPage() {
	const classes = useStyles();

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12}>
				<Typography variant="h4" gutterBottom>
					Find balance and transactions
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<TransactionSearchForm />
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 20,
		[theme.breakpoints.down("md")]: {
			paddingLeft: 15,
			paddingRight: 15,
		},
	},

	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	button: {
		marginBottom: 15,
	},
}));
