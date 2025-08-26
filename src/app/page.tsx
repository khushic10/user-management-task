"use client";

import { Container, Header, Button } from "semantic-ui-react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<Container textAlign="center" style={{ marginTop: "2rem" }}>
			<Header as="h1">Welcome to User Management App</Header>
			<p>Click the button below to view the users.</p>
			<Button primary size="large" onClick={() => router.push("/users")}>
				Go to Users
			</Button>
		</Container>
	);
}
