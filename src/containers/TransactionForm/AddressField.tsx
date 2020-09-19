// prettier-ignore
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { validation } from "../../validations/addressValidation";

import * as React from "react";

interface Props {
	value: string;
	onChange: (value: string) => void;
	hasError: boolean;
	onError: (value: boolean) => void;
}

export function AddressField(props: Props) {
	const classes = useStyles();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		const isCorrect = validation.isAddress(inputValue);
		if (isCorrect) {
			props.onError(false);
		} else {
			props.onError(true);
		}

		props.onChange(event.target.value);
	};

	return (
		<TextField
			error={props.hasError}
			value={props.value}
			onChange={handleChange}
			className={classes.textField}
		/>
	);
}

const useStyles = makeStyles({
	textField: {
		width: "80%",
		margin: 20,
	},
});
