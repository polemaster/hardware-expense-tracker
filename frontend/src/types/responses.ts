export interface InvoiceResponse {
  id: number;
  title: string;
  creationDate: string;
  items: InvoiceItemResponse[];
}

export interface InvoiceItemResponse {
  name: string;
  postingDate: string;
  costUSD: number;
  costPLN: number;
  invoiceId: number;
}
