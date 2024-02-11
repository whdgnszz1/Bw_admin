import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CONSULTING_KEY, CreateConsultingDTO, createConsulting } from "..";
import { ApiError } from "../../../common/types/api-error";

export const useCreateConsulting = (
  options: MutationOptions<void, ApiError, { dto: CreateConsultingDTO }> = {}
) => {
  const client = useQueryClient();
  return useMutation<void, ApiError, { dto: CreateConsultingDTO }>({
    ...options,
    mutationFn: createConsulting,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [CONSULTING_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
