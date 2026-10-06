import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { InvoicesPage } from "./components/InvoicesPage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
