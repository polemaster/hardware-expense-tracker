import type { InvoiceItemSearchParams } from "../types/requests";
import type { InvoiceItemResponse } from "../types/responses";
import { ApiError } from "./ApiError";

export async function getInvoiceItems(
  params?: InvoiceItemSearchParams,
): Promise<InvoiceItemResponse[]> {
  const url = new URL("http://localhost:8080/invoice-items");

  if (params?.name && params.name.trim().length > 0) {
    url.searchParams.set("name", params.name.trim());
  }

  if (params?.postingDate && params.postingDate.trim().length > 0) {
    url.searchParams.set("postingDate", params.postingDate.trim());
  }

  if (params?.sortBy) {
    url.searchParams.set("sortBy", params.sortBy);
  }

  if (params?.direction) {
    url.searchParams.set("direction", params.direction);
  }

  let response: Response;
  try {
    response = await fetch(url.toString());
  } catch {
    throw new ApiError("Unable to connect to the server", 0);
  }

  if (!response.ok) {
    let errorMessage = "Failed to fetch invoice items";
    try {
      const data = await response.json();
      if (typeof data === "string") {
        errorMessage = data;
      } else if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        errorMessage = data.message;
      } else if (
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof data.error === "string"
      ) {
        errorMessage = data.error;
      }
    } catch {
      errorMessage = "Response wasn't in the JSON format.";
    }
    throw new ApiError(errorMessage, response.status);
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
