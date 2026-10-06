export interface Invoice {
  id: number;
  title: string;
  items: InvoiceItem[];
  createdAt: string;
  totalPrice: number;
  totalPricePLN?: number;
}

export interface InvoiceItem {
  id: string;
  name: string;
  postingDate: string;
  priceUSD: number;
  pricePLN?: number;
}

export type ServerInvoiceItem = Omit<InvoiceItem, "id">;

export type ServerInvoiceInput = {
  title: string;
  items: ServerInvoiceItem[];
};

export type EditableItemKey = Exclude<keyof InvoiceItem, "id">;
