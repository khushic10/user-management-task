"use client";

import { useUser } from "@/hooks/useUser";
import {
	Button,
	Grid,
	Header,
	Icon,
	List,
	Message,
	Segment,
	Image,
	Container,
} from "semantic-ui-react";
import Link from "next/link";
import "@/styles/UserDetail.css"; // optional CSS for hover/shadows
import LoaderSegment from "@/components/Loader";

export default function UserDetail({ id }: { id: number }) {
	// use the custom hook
	const { data, isLoading, isError, error, refetch } = useUser(id);

	if (isLoading) {
		return <LoaderSegment message="Loading user..." />;
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
		<Container>
			<Segment className="user-detail-container">
				<Button as={Link} href="/users" icon labelPosition="left" primary>
					<Icon name="arrow left" /> Back to Users
				</Button>

				<Segment className="profile-header" textAlign="center">
					<Image
						src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
							u.name
						)}`}
						size="small"
						circular
						centered
						alt="avatar"
					/>
					<Header as="h2" className="user-name">
						{u.name}
						<Header.Subheader>@{u.username}</Header.Subheader>
					</Header>
				</Segment>

				<Grid stackable columns={2} className="user-detail-grid">
					<Grid.Column>
						<Segment className="info-segment">
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
						<Segment className="info-segment">
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
			</Segment>
		</Container>
	);
}

function normalizeUrl(url: string) {
	return url.startsWith("http") ? url : `https://${url}`;
}
