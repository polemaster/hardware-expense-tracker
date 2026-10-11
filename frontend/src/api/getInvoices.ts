import type { InvoiceResponse } from "../types/responses";
import { ApiError } from "./ApiError";

export async function getInvoices(): Promise<InvoiceResponse[]> {
  const response = await fetch("http://localhost:8080/invoices");

  if (!response.ok) {
    let errorMessage = "Failed to fetch invoices";
    try {
      const data = await response.json();
      if (typeof data === "string") {
        errorMessage = data;
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      }
    } catch {
      errorMessage = "Response wasn't in the JSON format.";
    }
    throw new ApiError(errorMessage, response.status);
  }

  return response.json();
}
