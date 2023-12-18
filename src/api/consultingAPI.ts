import { getAPI } from "../axios";

export const fetchConsultingMessages = async (selectedUserId: string) => {
  if (!selectedUserId) return;
  const response = await getAPI(`/consulting?studentId=${selectedUserId}`);
  return response.data;
};
