import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { InvoiceResponse } from "../types/responses";
import type { InvoiceItem } from "../types/invoice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getItemsTotalUSD(items: InvoiceItem[]): number {
  return items.reduce((total, item) => total + item.costUSD, 0);
}

export function getInvoiceTotalUSD(invoice: InvoiceResponse): number {
  return invoice.items.reduce((total, item) => total + item.costUSD, 0);
}

export function getInvoiceTotalPLN(invoice: InvoiceResponse): number {
  return invoice.items.reduce((total, item) => total + item.costPLN, 0);
}
