// prettier-ignore
import { Select, MenuItem } from "@material-ui/core";

import * as React from "react";
import { E_NETWORKS } from "../../constants/networks";

interface Props {
	value: string;
	onChange: (value: E_NETWORKS) => void;
}

export function NetworkFeild(props: Props) {
	const handleChange = (
		event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
	) => {
		props.onChange(event.target.value as E_NETWORKS);
	};

	return (
		<Select
			labelId="demo-controlled-open-select-label"
			id="demo-controlled-open-select"
			value={props.value}
			onChange={handleChange}
		>
			{Object.keys(E_NETWORKS).map((net) => {
				return (
					<MenuItem key={`net-${net}`} value={net}>
						{net}
					</MenuItem>
				);
			})}
		</Select>
	);
}
