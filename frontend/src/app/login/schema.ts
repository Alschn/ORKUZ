import * as z from "zod";

const loginSchema = z
  .object({
    login: z.string().min(1, "Login is required"),
    password: z.string().min(1, "Password is required"),
  })
  .required();

type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, type LoginSchema };
