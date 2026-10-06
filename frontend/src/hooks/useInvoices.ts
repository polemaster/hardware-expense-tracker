import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../api/invoices";
import type { Invoice } from "../types/invoice";
import type { ApiError } from "../api/ApiError";

export function useInvoices() {
  return useQuery<Invoice[], ApiError>({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });
}
