import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiError } from "../../../common/types/api-error";
import { CONSULTING_KEY, ConsultingDTO, getConsultingList } from "..";

export const useGetConsultingList = <T = ConsultingDTO>(
  userId: number,
  options?: Omit<
    UseQueryOptions<ConsultingDTO, ApiError, T[]>,
    "queryFn" | "queryKey"
  >
) => {
  return useQuery<ConsultingDTO, ApiError, T[]>({
    queryKey: [CONSULTING_KEY, userId],
    queryFn: () => getConsultingList(userId),
    ...options,
  });
};
