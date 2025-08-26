"use client";

import { Button, ButtonGroup } from "semantic-ui-react";

type Props = {
	layout: "table" | "card";
	onChange: (layout: "table" | "card") => void;
};

export default function LayoutToggle({ layout, onChange }: Props) {
	return (
		<ButtonGroup size="small">
			<Button
				icon="table"
				active={layout === "table"}
				onClick={() => onChange("table")}
				title="Table view"
			/>
			<Button
				icon="grid layout"
				active={layout === "card"}
				onClick={() => onChange("card")}
				title="Card view"
			/>
		</ButtonGroup>
	);
}
