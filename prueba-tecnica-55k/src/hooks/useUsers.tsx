import { fetchUsers } from "../services/users";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type User } from "../types";

export const useUsers = () => {
  const { data, isError, isLoading, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ users: User[]; nextCursor?: number }>({
      queryKey: ["users"],
      queryFn: fetchUsers,
      initialPsageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    });

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
