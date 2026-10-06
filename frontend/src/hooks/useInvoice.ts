import { useState, useMemo, type FormEvent } from "react";
import type { EditableItemKey, InvoiceItem } from "../types/invoice";

export function useInvoice() {
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      postingDate: "",
      priceUSD: 0,
    },
  ]);

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.priceUSD, 0),
    [items],
  );

  function addItem() {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", postingDate: "", priceUSD: 0 },
    ]);
  }

  function updateItem<K extends EditableItemKey>(
    itemId: string,
    key: K,
    value: InvoiceItem[K],
  ) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [key]: value } : item,
      ),
    );
  }

  function removeItem(itemId: string) {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitting:", { items, totalPrice });
  }

  return { items, totalPrice, addItem, updateItem, removeItem, handleSubmit };
}
