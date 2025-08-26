"use client";

import { Table, Label } from "semantic-ui-react";
import type { User } from "@/types/user";

type Props = {
	users: User[];
	onSelect: (id: number) => void;
};

export default function UserTable({ users, onSelect }: Props) {
	return (
		<Table celled selectable>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.HeaderCell>Email</Table.HeaderCell>
					<Table.HeaderCell>Phone</Table.HeaderCell>
					<Table.HeaderCell>Website</Table.HeaderCell>
					<Table.HeaderCell>City</Table.HeaderCell>
					<Table.HeaderCell>Company</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{users.map((u) => (
					<Table.Row
						key={u.id}
						onClick={() => onSelect(u.id)}
						style={{ cursor: "pointer" }}
					>
						<Table.Cell>
							<Label circular color="blue" empty style={{ marginRight: 8 }} />
							{u.name}
						</Table.Cell>
						<Table.Cell>{u.email}</Table.Cell>
						<Table.Cell>{u.phone}</Table.Cell>
						<Table.Cell>
							<a
								href={normalizeUrl(u.website)}
								target="_blank"
								rel="noreferrer"
							>
								{u.website}
							</a>
						</Table.Cell>
						<Table.Cell>{u.address.city}</Table.Cell>
						<Table.Cell>{u.company.name}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

function normalizeUrl(url: string) {
	return url.startsWith("http") ? url : `https://${url}`;
}
