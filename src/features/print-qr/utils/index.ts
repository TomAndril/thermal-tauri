import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";

export async function printQR(title: string, link: string) {
  try {
    await invoke("print_qr", { title, link });
    toast.success("Printed QR", {
      description: "QR printed successfully",
    });
  } catch (error) {
    toast.error("Failed to print QR", {
      description: "Please try again",
    });
  }
}
