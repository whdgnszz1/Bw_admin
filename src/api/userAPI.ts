import { getAPI } from "../axios";

export const fetchNotAllowedUser = async () => {
  const response = await getAPI(`/user/approve`);
  return response.data;
};

export const fetchMember = async () => {
  const response = await getAPI(`/user/member`);
  return response.data;
};
