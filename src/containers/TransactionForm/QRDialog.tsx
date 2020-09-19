import { DialogTitle, DialogContent, makeStyles } from "@material-ui/core";
import QRCode from "qrcode.react";
import * as React from "react";

interface Props {
	value: string;
}

export function QRDialog(props: Props) {
	const classes = useStyles();

	return (
		<>
			<DialogTitle id="alert-dialog-title">
				{"Scan QR code to copy address"}
			</DialogTitle>
			<DialogContent classes={{ root: classes.content }}>
				<QRCode value={props.value} />
			</DialogContent>
		</>
	);
}

const useStyles = makeStyles({
	content: {
		display: "flex",
		justifyContent: "center",
		marginBottom: 20,
	},
});
