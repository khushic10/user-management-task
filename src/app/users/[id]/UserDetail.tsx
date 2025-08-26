"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/service/userservice";
import {
	Button,
	Grid,
	Header,
	Icon,
	List,
	Loader,
	Message,
	Segment,
} from "semantic-ui-react";
import Link from "next/link";
import type { User } from "@/types/user";

export default function UserDetail({ id }: { id: number }) {
	const { data, isLoading, isError, error, isSuccess, refetch } =
		useQuery<User>({
			queryKey: ["user", id],
			queryFn: () => fetchUser(id),
			enabled: !Number.isNaN(id),
		});

	if (isLoading) {
		return (
			<Segment>
				<Loader active inline="centered">
					Loading user...
				</Loader>
			</Segment>
		);
	}

	if (isError) {
		return (
			<>
				<Message
					negative
					header="Failed to load user"
					content={(error as Error)?.message || "Please try again."}
				/>
				<Button onClick={() => refetch()} icon labelPosition="left">
					<Icon name="refresh" /> Retry
				</Button>
				<Button as={Link} href="/users" icon labelPosition="left" primary>
					<Icon name="arrow left" /> Back to Users
				</Button>
			</>
		);
	}

	if (!data) return null;

	const u = data;

	return (
		<>
			{isSuccess && (
				<Message positive content="User details loaded successfully." />
			)}

			<Button as={Link} href="/users" icon labelPosition="left" primary>
				<Icon name="arrow left" /> Back to Users
			</Button>

			<Header as="h2" style={{ marginTop: "1rem" }}>
				{u.name}
				<Header.Subheader>@{u.username}</Header.Subheader>
			</Header>

			<Grid stackable columns={2}>
				<Grid.Column>
					<Segment>
						<Header as="h4">Contact</Header>
						<List>
							<List.Item>
								<Icon name="mail" />
								<List.Content>
									<a href={`mailto:${u.email}`}>{u.email}</a>
								</List.Content>
							</List.Item>
							<List.Item>
								<Icon name="phone" />
								<List.Content>
									<a href={`tel:${u.phone}`}>{u.phone}</a>
								</List.Content>
							</List.Item>
							<List.Item>
								<Icon name="world" />
								<List.Content>
									<a
										href={normalizeUrl(u.website)}
										target="_blank"
										rel="noreferrer"
									>
										{u.website}
									</a>
								</List.Content>
							</List.Item>
						</List>
					</Segment>
				</Grid.Column>

				<Grid.Column>
					<Segment>
						<Header as="h4">Address</Header>
						<p>
							{u.address.street}, {u.address.suite}
							<br />
							{u.address.city}, {u.address.zipcode}
						</p>
						<Header as="h4">Company</Header>
						<p>
							<strong>{u.company.name}</strong>
							<br />
							{u.company.catchPhrase}
							<br />
							<em>{u.company.bs}</em>
						</p>
					</Segment>
				</Grid.Column>
			</Grid>
		</>
	);
}

function normalizeUrl(url: string) {
	return url.startsWith("http") ? url : `https://${url}`;
}
