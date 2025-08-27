"use client";

import { Header, Button, Segment, Icon, Divider } from "semantic-ui-react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				marginTop: "3rem",
			}}
		>
			<Segment
				padded="very"
				raised
				textAlign="center"
				style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}
			>
				<Header as="h1" color="blue" icon textAlign="center">
					<Icon name="users" />
					User Management App
				</Header>
				<p
					className="ui large text"
					style={{ marginBottom: "2rem", color: "#555" }}
				>
					Manage your users efficiently and with ease.
				</p>
				<Button
					primary
					size="huge"
					icon
					labelPosition="right"
					onClick={() => router.push("/users")}
					style={{ marginBottom: "1rem" }}
				>
					Go to Users <Icon name="arrow right" />
				</Button>
				<Divider />
				<p className="ui small text" style={{ color: "#777" }}>
					Developed by <strong>Khushi Chaudhary</strong>
				</p>
			</Segment>
		</div>
	);
}
