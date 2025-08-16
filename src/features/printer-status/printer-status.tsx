import usePrinterStatus from "@/hooks/use-printer-status";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PrinterStatus() {
  const { status, getPrinterStatus } = usePrinterStatus();

  useEffect(() => {
    if (status?.status === "connected") {
      toast.success("Printer connected", {
        description: "Printer is ready to use",
      });
    } else {
      toast.error("Printer disconnected", {
        description: "Please connect the printer to continue",
        action: {
          label: "Try Again",
          onClick: () => {
            getPrinterStatus();
          },
        },
      });
    }
  }, [status]);
}
