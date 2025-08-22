import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";
import { create } from "zustand";

interface PrinterStatus {
  status: "connected" | "disconnected";
}

const usePrinterStatusStore = create<PrinterStatus>((set) => ({
  status: "disconnected",
  setStatus: (status: "connected" | "disconnected") => set({ status }),
}));

export default function usePrinterStatus() {
  const printerStatus = usePrinterStatusStore((state) => state.status);

  async function getPrinterStatus() {
    const { status } = await invoke<PrinterStatus>("get_printer_status");
    switch (status) {
      case "connected":
        toast.success("Printer connected", {
          description: "Printer is ready to use",
        });
        usePrinterStatusStore.setState({ status: "connected" });
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
        usePrinterStatusStore.setState({ status: "disconnected" });
        break;
    }
  }

  return { status: printerStatus, getPrinterStatus };
}
