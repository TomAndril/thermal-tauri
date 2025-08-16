import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Printer } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import usePrinterStatus from "../printer-status/hooks/use-printer-status";
import { printText } from "./utils";

export default function PrintText() {
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
      printText(values.text);
    }
  }

  return (
    <>
      <h1 className="text-md font-semibold flex items-center justify-start">
        Print Text <Printer width={18} className="ml-2 inline-block" />
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
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
            disabled={!form.formState.isValid || status === "disconnected"}
          >
            Print
          </Button>
        </form>
      </Form>
    </>
  );
}
