export interface InvoiceCreationRequest {
  title: string;
  creationDate: string;
  items: InvoiceItemCreationRequest[];
}

export interface InvoiceItemCreationRequest {
  name: string;
  postingDate: string;
  costUSD: number;
}

export type InvoiceItemSortField = "name" | "postingDate";
export type SortDirection = "ASC" | "DESC";

export interface InvoiceItemSearchParams {
  name?: string;
  postingDate?: string;
  sortBy?: InvoiceItemSortField;
  direction?: SortDirection;
}
