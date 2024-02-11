import axiosInstance from "../../common/utils/axiosInstance";
import { ConsultingDTO } from "./types";

export async function createConsulting(): Promise<any> {
  const { data } = await axiosInstance({
    url: "/consulting",
    method: "post",
  });
  return data;
}

export async function getConsultingList(
  userId: number
): Promise<ConsultingDTO> {
  const { data } = await axiosInstance({
    url: "/consulting",
    method: "get",
    params: { userId },
  });
  return data;
}
