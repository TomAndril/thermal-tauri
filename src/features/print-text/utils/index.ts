import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";

export async function printText(text: string) {
  try {
    await invoke("print_text", { text });
    toast.success("Printed text", {
      description: "Text printed successfully",
    });
  } catch (error) {
    toast.error("Failed to print text", {
      description: "Please try again",
    });
  }
}
