import type { InvoiceCreationRequest } from "../types/requests";
import type { InvoiceResponse } from "../types/responses";
import { ApiError } from "./ApiError";

export async function createInvoice(
  input: InvoiceCreationRequest,
): Promise<InvoiceResponse> {
  let response: Response;

  try {
    response = await fetch("http://localhost:8080/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  } catch {
    throw new ApiError("Unable to connect to the server", 0);
  }

  if (!response.ok) {
    let message = "Failed to create invoice";
    try {
      const data = await response.json();
      if (typeof data === "string") {
        message = data;
      } else if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        message = data.message;
      } else if (
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof data.error === "string"
      ) {
        message = data.error;
      }
    } catch {
      // response wasn't JSON
    }
    throw new ApiError(message, response.status);
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError(
      "The server returned an invalid response",
      response.status,
    );
  }
}
