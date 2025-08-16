import usePrinterStatus from "./features/printer-status/hooks/use-printer-status";

export default function App() {
  usePrinterStatus();

  return (
    <main className="container">
      <h1>Hello World</h1>
    </main>
  );
}
