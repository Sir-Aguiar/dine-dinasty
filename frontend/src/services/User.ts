import { AxiosInstance } from "axios";

export interface UserUpdateInput {
  name?: string;
  username?: string;
}
export const UpdateUser = async (API: AxiosInstance, { name, username }: UserUpdateInput) => {
  const response = await API.put("/user", { name, username });
  return response.data;
};
