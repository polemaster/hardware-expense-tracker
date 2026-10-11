import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { InvoiceResponse, InvoiceItemResponse } from "../types/responses";
import type { InvoiceItem } from "../types/invoice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getItemsTotalUSD(items: InvoiceItem[]): number {
  return items.reduce((total, item) => total + item.costUSD, 0);
}

export function getInvoiceTotalUSD(invoice: InvoiceResponse): number {
  return getInvoiceItemsTotalUSD(invoice.items);
}

export function getInvoiceTotalPLN(invoice: InvoiceResponse): number {
  return getInvoiceItemsTotalPLN(invoice.items);
}

export function getInvoiceItemsTotalUSD(items: InvoiceItemResponse[]): number {
  return items.reduce((total, item) => total + (item.costUSD || 0), 0);
}

export function getInvoiceItemsTotalPLN(items: InvoiceItemResponse[]): number {
  return items.reduce((total, item) => total + (item.costPLN || 0), 0);
}

export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
