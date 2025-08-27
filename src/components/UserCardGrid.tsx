"use client";

import { Card, Icon, Image } from "semantic-ui-react";
import type { User } from "@/types/user";
import "@/styles/userCard.css";

type Props = {
	users: User[];
	onSelect: (id: number) => void;
};

export default function UserCardGrid({ users, onSelect }: Props) {
	return (
		<Card.Group itemsPerRow={3} stackable doubling>
			{users.map((u) => (
				<Card
					key={u.id}
					link
					onClick={() => onSelect(u.id)}
					className="user-card"
				>
					<Card.Content textAlign="left">
						<div className="user-header">
							<Image
								src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
									u.name
								)}`}
								alt={u.name}
								size="large"
								avatar
								className="user-avatar"
							/>
							<div>
								<Card.Header className="user-name">{u.name}</Card.Header>
								<Card.Meta className="user-email">{u.email}</Card.Meta>
							</div>
						</div>

						<Card.Description>
							<p>
								<Icon name="user" /> @{u.username}
							</p>
							<p>
								<Icon name="phone" /> {u.phone}
							</p>
							<p>
								<Icon name="map marker alternate" /> {u.address.city}
							</p>
						</Card.Description>
					</Card.Content>

					<Card.Content extra>
						<Icon name="building" /> {u.company.name} ·{" "}
						<a href={normalizeUrl(u.website)} target="_blank" rel="noreferrer">
							{u.website}
						</a>
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	);
}

function normalizeUrl(url: string) {
	return url.startsWith("http") ? url : `https://${url}`;
}
