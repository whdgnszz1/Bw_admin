import { getAPI } from "../axios";

export const fetchNotAllowedUser = async () => {
  const response = await getAPI(`/user/approve`);
  return response.data;
};
