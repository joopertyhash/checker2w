import { List, ListItem, ListItemText } from "@material-ui/core";
import * as React from "react";
import { validation } from "../../validations/addressValidation";

interface Props {
	values: string[];
	onClick: (value: string) => void;
	onError: (value: boolean) => void;
}

export function PreviousSearches(props: Props) {
	const handleChange = (address: string) => {
		const isCorrect = validation.isAddress(address);
		if (isCorrect) {
			props.onError(false);
		} else {
			props.onError(true);
		}

		props.onClick(address);
	};

	return (
		<List dense>
			{props.values.map((item, index) => {
				return (
					<ListItem
						key={`search-${item}-${index}`}
						button
						onClick={() => handleChange(item)}
					>
						<ListItemText
							primary={item}
							primaryTypographyProps={{ variant: "subtitle2" }}
						/>
					</ListItem>
				);
			})}
		</List>
	);
}
