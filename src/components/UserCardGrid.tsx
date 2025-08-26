"use client";

import { Card, Icon, Image } from "semantic-ui-react";
import type { User } from "@/types/user";

type Props = {
	users: User[];
	onSelect: (id: number) => void;
};

export default function UserCardGrid({ users, onSelect }: Props) {
	return (
		<Card.Group itemsPerRow={3} stackable>
			{users.map((u) => (
				<Card key={u.id} link onClick={() => onSelect(u.id)}>
					<Card.Content>
						<Image
							floated="right"
							size="mini"
							alt={u.name}
							src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
								u.name
							)}`}
						/>
						<Card.Header>{u.name}</Card.Header>
						<Card.Meta>{u.email}</Card.Meta>
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
