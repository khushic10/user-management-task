"use client";

import { Table, Image, Icon, Button } from "semantic-ui-react";
import type { User } from "@/types/user";
import "@/styles/UserTable.css";

type Props = {
	users: User[];
	onSelect: (id: number) => void;
};

export default function UserTable({ users, onSelect }: Props) {
	return (
		<Table celled striped compact>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.HeaderCell>Email</Table.HeaderCell>
					<Table.HeaderCell>Phone</Table.HeaderCell>

					<Table.HeaderCell>City</Table.HeaderCell>
					<Table.HeaderCell>Company</Table.HeaderCell>
					<Table.HeaderCell>Action</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{users.map((u) => (
					<Table.Row key={u.id} className="user-row">
						<Table.Cell>
							<div className="user-name-cell">
								<Image
									src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
										u.name
									)}`}
									alt={u.name}
									size="mini"
									avatar
									className="user-avatar"
								/>
								<span className="name-text">{u.name}</span>
							</div>
						</Table.Cell>
						<Table.Cell>{u.email}</Table.Cell>
						<Table.Cell>{u.phone}</Table.Cell>

						<Table.Cell>{u.address.city}</Table.Cell>
						<Table.Cell>{u.company.name}</Table.Cell>
						<Table.Cell>
							<Button
								primary
								size="small"
								onClick={() => onSelect(u.id)}
								icon
								labelPosition="right"
							>
								Details <Icon name="arrow right" />
							</Button>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}
