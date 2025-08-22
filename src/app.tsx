import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import PrintQR from "./features/print-qr/print-qr";
import PrintText from "./features/print-text/print-text";
import usePrinterStatus from "./features/printer-status/hooks/use-printer-status";

export default function App() {
  const { getPrinterStatus } = usePrinterStatus();

  useEffect(() => {
    getPrinterStatus();
  }, []);

  return (
    <main className="mx-auto max-w-lg mt-14">
      <Tabs defaultValue="text">
        <TabsList>
          <TabsTrigger value="text">Simple Text</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <PrintText />
        </TabsContent>
        <TabsContent value="qr">
          <PrintQR />
        </TabsContent>
      </Tabs>
    </main>
  );
}
