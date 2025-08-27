"use client";

import {
	useQuery,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";
import { fetchUser } from "@/service/userservice";
import type { User } from "@/types/user";

type UserOptions<TData = User> = Omit<
	UseQueryOptions<User, Error, TData, ["user", number]>,
	"queryKey" | "queryFn"
> & {
	enabled?: boolean;
};

export function useUser<TData = User>(
	id: number,
	options?: UserOptions<TData>
): UseQueryResult<TData, Error> {
	return useQuery<User, Error, TData, ["user", number]>({
		queryKey: ["user", id],
		queryFn: () => fetchUser(id),
		enabled:
			(options?.enabled ?? true) && Number.isFinite(id) && !Number.isNaN(id),
		// Inherit defaults from Provider
		...options,
	});
}
