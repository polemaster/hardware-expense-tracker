export interface Invoice {
  id: number;
  title: string;
  items: InvoiceItem[];
  createdAt: string;
}

export interface InvoiceItem {
  id: number;
  name: string;
  postingDate: string;
  priceUSD: number;
  pricePLN?: number;
}

export type EditableItemKey = Exclude<keyof InvoiceItem, "id">;
