import api from "@/lib/api/axios";
import { User } from "./types/User";



export async function getUsers(): Promise<User[]> {
  const response = await api.get("/User/GetAllUsers");
  return response.data;
}