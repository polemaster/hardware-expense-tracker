import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "../api/createInvoice";
import type { EditableItemKey, InvoiceItem } from "../types/invoice";
import type { ApiError } from "../api/ApiError";
import type { InvoiceResponse } from "../types/responses";
import type { InvoiceCreationRequest } from "../types/requests";
import { getItemsTotalUSD } from "../lib/utils";

function createEmptyItems(): InvoiceItem[] {
  return [
    {
      id: crypto.randomUUID(),
      name: "",
      postingDate: "",
      costUSD: 0,
    },
  ];
}

export function useInvoice() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>(createEmptyItems);

  const createInvoiceMutation = useMutation<
    InvoiceResponse,
    ApiError,
    InvoiceCreationRequest
  >({
    mutationFn: createInvoice,
    onSuccess: () => {
      resetForm();
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });

  const totalPrice = getItemsTotalUSD(items);

  function addItem() {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", postingDate: "", costUSD: 0 },
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
    createInvoiceMutation.reset();
  }

  function resetForm() {
    setTitle("");
    setItems(createEmptyItems());
  }

  function getTodaysDate() {
    return new Date().toISOString().split("T")[0];
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    createInvoiceMutation.mutate({
      title,
      creationDate: getTodaysDate(),
      items: items.map(({ id, ...item }) => item), // eslint-disable-line @typescript-eslint/no-unused-vars
    });
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
    isSubmitting: createInvoiceMutation.isPending,
    error: createInvoiceMutation.error,
    clearError,
  };
}
