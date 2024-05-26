import { useMutation } from "@tanstack/react-query";
import { type LoginSchema } from "./schema";
import { loginAction } from "./actions";

export type LoginResponseData = Awaited<ReturnType<typeof loginAction>>;

export interface UseLoginMutationOptions {
  onSuccess?: (
    data: LoginResponseData,
    variables: LoginSchema,
    context: unknown,
  ) => void;
  onError?: (error: Error, variables: LoginSchema, context: unknown) => void;
}

export const useLoginMutation = (options?: UseLoginMutationOptions) => {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const result = await loginAction(data);
      return result;
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
};
