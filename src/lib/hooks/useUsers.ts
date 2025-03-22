import useSWR from "swr";
import { getUsers } from "../services/userService";

export function useUsers() {
  const { data, error, mutate, isLoading } = useSWR("/User/GetAllUsers", getUsers);

  return {
    users: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}