"use client";

import { Button, Segment } from "semantic-ui-react";

type Props = {
	layout: "table" | "card";
	onChange: (layout: "table" | "card") => void;
};

export default function LayoutToggle({ layout, onChange }: Props) {
	return (
		<Segment
			compact
			style={{
				display: "inline-flex",
				padding: "0.25rem",
				borderRadius: "8px",
				boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
				background: "#f4f9ff",
			}}
		>
			<Button
				icon="table"
				content="Table"
				active={layout === "table"}
				color={layout === "table" ? "blue" : undefined}
				onClick={() => onChange("table")}
				style={{ borderRadius: "6px 0 0 6px" }}
			/>
			<Button
				icon="grid layout"
				content="Card"
				active={layout === "card"}
				color={layout === "card" ? "blue" : undefined}
				onClick={() => onChange("card")}
				style={{ borderRadius: "0 6px 6px 0" }}
			/>
		</Segment>
	);
}
