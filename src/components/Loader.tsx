"use client";

import { Loader, Segment } from "semantic-ui-react";

type LoaderSegmentProps = {
	message?: string;
	minHeight?: number | string;
};

export default function LoaderSegment({
	message = "Loading...",
	minHeight = 120,
}: LoaderSegmentProps) {
	return (
		<Segment style={{ minHeight, position: "relative" }}>
			<Loader active inline="centered">
				{message}
			</Loader>
		</Segment>
	);
}
