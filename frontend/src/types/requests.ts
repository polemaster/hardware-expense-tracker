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
