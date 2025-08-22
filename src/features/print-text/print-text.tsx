import z from "zod";
import usePrinterStatus from "../printer-status/hooks/use-printer-status";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { formSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { printText } from "./utils";
import { memo } from "react";

export default function PrintTextComponent() {
  const { status } = usePrinterStatus();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (status === "connected") {
      printText(values.text).then(() => {
        form.reset();
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none h-40"
                  placeholder="Type your text here..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={status === "disconnected"}
        >
          Print
        </Button>
      </form>
    </Form>
  );
}

export const PrintText = memo(PrintTextComponent);
