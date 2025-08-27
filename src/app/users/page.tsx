"use client";

import { useMemo, useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import {
	Message,
	Header,
	Divider,
	Pagination,
	Icon,
	Grid,
	Segment,
} from "semantic-ui-react";
import LayoutToggle from "@/components/LayoutToggle";
import UserTable from "@/components/UserTable";
import UserCardGrid from "@/components/UserCardGrid";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchInput from "@/components/Search";
import LoaderSegment from "@/components/Loader";
import Link from "next/link";

type FormValues = { q?: string };

const schema: yup.ObjectSchema<FormValues> = yup.object({
	q: yup
		.string()
		.max(100, "Search is too long")
		.test("name-or-email", "Enter a valid name or email", (value) => {
			if (!value) return true;
			const isEmail = yup.string().email().isValidSync(value);
			const isName = /^[a-zA-Z\s]+$/.test(value);
			return isEmail || isName;
		})
		.defined(),
});

export default function UsersPage() {
	const router = useRouter();

	const { data, isLoading, isError, isSuccess, error, refetch } = useUsers();

	const [layout, setLayout] = useLocalStorage<"table" | "card">(
		"um_layout",
		"table"
	);

	const { control, watch, setFocus } = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: { q: "" },
		mode: "onChange",
	});

	const q = watch("q") ?? "";

	const filtered = useMemo(() => {
		if (!data) return [];
		const term = q.trim().toLowerCase();
		if (!term) return data;
		return data.filter(
			(u) =>
				u.name.toLowerCase().includes(term) ||
				u.email.toLowerCase().includes(term)
		);
	}, [data, q]);

	const [page, setPage] = useState(1);
	const pageSize = 6;
	const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
	const pageUsers = useMemo(
		() => filtered.slice((page - 1) * pageSize, page * pageSize),
		[filtered, page]
	);

	useEffect(() => setPage(1), [q]);

	const handleSelect = (id: number) => router.push(`/users/${id}`);

	return (
		<div>
			<div
				style={{ position: "relative", textAlign: "center", marginTop: "1rem" }}
			>
				{/* Home icon on the left */}
				<Link href="/" passHref>
					<Icon
						name="home"
						size="big"
						link
						title="Go to Home"
						style={{
							position: "absolute",
							left: 0,
							top: "50%",
							transform: "translateY(-50%)",
						}}
					/>
				</Link>

				{/* Centered header */}
				<Header as="h1" style={{ display: "inline-block" }}>
					<Icon name="users" circular color="blue" />
					<Header.Content>
						Users
						<Header.Subheader>
							Browse and inspect user profiles
						</Header.Subheader>
					</Header.Content>
				</Header>
			</div>
			<Segment raised>
				<Grid stackable verticalAlign="middle" columns={2}>
					<Grid.Column width={12}>
						<SearchInput<FormValues>
							name="q"
							control={control}
							placeholder="Search by name or email..."
							onClear={() => setFocus("q")}
						/>
					</Grid.Column>

					{!isLoading && isSuccess && filtered.length > 0 && (
						<Grid.Column width={4} textAlign="right">
							<LayoutToggle layout={layout} onChange={setLayout} />
						</Grid.Column>
					)}
				</Grid>
			</Segment>

			{isLoading && <LoaderSegment message="Loading users..." />}

			{isError && (
				<Message
					negative
					header="Failed to load users"
					content={(error as Error)?.message || "Please try again."}
					onDismiss={() => refetch()}
				/>
			)}

			{!isLoading && isSuccess && filtered.length === 0 && (
				<Message info content="No users match your search." />
			)}

			{!isLoading && isSuccess && filtered.length > 0 && (
				<>
					{layout === "table" ? (
						<UserTable users={pageUsers} onSelect={handleSelect} />
					) : (
						<UserCardGrid users={pageUsers} onSelect={handleSelect} />
					)}
					<Divider hidden />
					<Pagination
						activePage={page}
						totalPages={totalPages}
						siblingRange={1}
						onPageChange={(_, data) => setPage(Number(data.activePage))}
					/>
					<Divider hidden />
				</>
			)}
		</div>
	);
}
