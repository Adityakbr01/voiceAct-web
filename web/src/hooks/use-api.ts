import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export function useApiQuery<T>(key: string[], url: string) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get<T>(url);
      return data;
    },
  });
}

export function useApiMutation<TData, TVariables = void>(
  url: string,
  method: "post" | "put" | "patch" | "delete" = "post",
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const { data } = await api[method]<TData>(url, variables);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
