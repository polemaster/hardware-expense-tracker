import type { ServerInvoiceInput } from "../types/invoice";
import { ApiError } from "./ApiError";

export async function createInvoice(input: ServerInvoiceInput) {
  const response = await fetch("/api/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    let errorMessage = "Failed to create invoice";
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
      // response wasn't JSON
    }
    throw new ApiError(errorMessage, response.status);
  }

  return response.json();
}
