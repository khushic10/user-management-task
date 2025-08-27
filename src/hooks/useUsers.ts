"use client";

import {
	useQuery,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";
import { fetchUsers } from "@/service/userservice";
import type { User } from "@/types/user";

type UsersOptions<TData = User[]> = Omit<
	UseQueryOptions<User[], Error, TData, ["users"]>,
	"queryKey" | "queryFn"
>;

export function useUsers<TData = User[]>(
	options?: UsersOptions<TData>
): UseQueryResult<TData, Error> {
	return useQuery<User[], Error, TData, ["users"]>({
		queryKey: ["users"],
		queryFn: fetchUsers,
		// Inherit staleTime, retry, refetchOnWindowFocus from Provider defaults
		...options,
	});
}
