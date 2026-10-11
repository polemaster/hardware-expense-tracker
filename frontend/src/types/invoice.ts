// export interface Invoice {
//   id: number;
//   title: string;
//   items: InvoiceItem[];
//   createdAt: string;
//   totalPrice: number;
//   totalPricePLN?: number;
// }

export interface InvoiceItem {
  id: string;
  name: string;
  postingDate: string;
  costUSD: number;
  // costPLN?: number;
}

export type EditableItemKey = Exclude<keyof InvoiceItem, "id">;
