import { useState, useMemo } from "react";
import type { EditableItemKey, InvoiceItem } from "../types/invoice";
import { useCreateInvoice } from "./useCreateInvoice";
import type { ApiError } from "../api/ApiError";

export function useInvoice() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      postingDate: "",
      priceUSD: 0,
    },
  ]);

  const createInvoice = useCreateInvoice();

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

  function clearError() {
    createInvoice.reset();
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createInvoice.mutateAsync({
        title,
        items: items.map(({ id, ...item }) => item), // eslint-disable-line @typescript-eslint/no-unused-vars
      });

      setItems([
        {
          id: crypto.randomUUID(),
          name: "",
          postingDate: "",
          priceUSD: 0,
        },
      ]);
      setTitle("");
    } catch {
      // Error is caught to prevent unhandled rejection,
      // and state is preserved in createInvoice.error
    }
  }

  return {
    title,
    setTitle,
    items,
    totalPrice,
    addItem,
    updateItem,
    removeItem,
    handleSubmit,
    isSubmitting: createInvoice.isPending,
    error: createInvoice.error as ApiError,
    clearError,
  };
}
