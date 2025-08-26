"use client";

import { useMemo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/service/userservice";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import {
	Input,
	Loader,
	Message,
	Header,
	Divider,
	Pagination,
} from "semantic-ui-react";
import LayoutToggle from "@/components/LayoutToggle";
import UserTable from "@/components/UserTable";
import UserCardGrid from "@/components/UserCardGrid";
import type { User } from "@/types/user";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = { q?: string };

const schema: yup.ObjectSchema<FormValues> = yup.object({
	q: yup.string().max(100, "Search is too long").defined(),
});

export default function UsersPage() {
	const router = useRouter();
	const { data, isLoading, isError, isSuccess, error, refetch } = useQuery<
		User[]
	>({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

	const [layout, setLayout] = useLocalStorage<"table" | "card">(
		"um_layout",
		"table"
	);

	const {
		control,
		watch,
		formState: { errors },
		resetField,
		setFocus,
	} = useForm<FormValues>({
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

	// Simple client-side pagination (bonus)
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
			<Header
				as="h1"
				content="Users"
				subheader="Browse and inspect user profiles"
			/>
			<div
				style={{
					display: "flex",
					gap: 12,
					alignItems: "center",
					margin: "1rem 0",
				}}
			>
				<Controller
					name="q"
					control={control}
					render={({ field }) => (
						<Input
							placeholder="Search by name or email..."
							value={field.value ?? ""}
							onChange={(_, data) => field.onChange(data.value)}
							onBlur={field.onBlur}
							icon={
								field.value
									? {
											name: "close",
											link: true,
											onClick: () => {
												resetField("q");
												setFocus("q");
											},
									  }
									: "search"
							}
						/>
					)}
				/>

				<LayoutToggle layout={layout} onChange={setLayout} />
			</div>

			{errors.q && <Message warning content={errors.q.message} />}

			{isLoading && (
				<div style={{ minHeight: 120, position: "relative" }}>
					<Loader active inline="centered">
						Loading users...
					</Loader>
				</div>
			)}

			{isError && (
				<Message
					negative
					header="Failed to load users"
					content={(error as Error)?.message || "Please try again."}
					onDismiss={() => refetch()}
				/>
			)}

			{isSuccess && (
				<Message positive>
					Loaded {filtered.length} of {data?.length ?? 0} users.
				</Message>
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
				</>
			)}
		</div>
	);
}
