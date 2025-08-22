import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(20, {
    message: "Title cannot be more than 20 characters",
  }),
  link: z.url().min(1, { message: "Link is required" }),
});
