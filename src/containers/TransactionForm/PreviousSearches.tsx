import { List, ListItem, ListItemText } from "@material-ui/core";
import * as React from "react";

interface Props {
	values: string[];
	onClick: (value: string) => void;
}

export function PreviousSearches(props: Props) {
	const handleClick = (item: string) => {
		props.onClick(item);
	};

	return (
		<List dense>
			{props.values.map((item, index) => {
				return (
					<ListItem
						key={`search-${item}-${index}`}
						button
						onClick={() => handleClick(item)}
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
