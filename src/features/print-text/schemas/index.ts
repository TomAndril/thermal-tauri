import { z } from "zod";

export const formSchema = z.object({
  text: z.string().min(1, { message: "Text is required" }).max(200, {
    message: "Text cannot be more than 200 characters",
  }),
});
