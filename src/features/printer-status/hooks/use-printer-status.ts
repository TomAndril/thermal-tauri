import { invoke } from "@tauri-apps/api/core";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface PrinterStatus {
  status: "connected" | "disconnected";
}

export default function usePrinterStatus() {
  const hasCheckedRef = useRef(false);

  async function getPrinterStatus() {
    const { status } = await invoke<PrinterStatus>("get_printer_status");
    switch (status) {
      case "connected":
        toast.success("Printer connected", {
          description: "Printer is ready to use",
        });
        break;
      case "disconnected":
        toast.error("Printer disconnected", {
          description: "Please connect the printer to continue",
          action: {
            label: "Try Again",
            onClick: () => {
              getPrinterStatus();
            },
          },
          duration: Infinity,
          dismissible: false,
        });
        break;
    }
  }

  useEffect(() => {
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true;
      getPrinterStatus();
    }
  }, []);

  return null;
}
