import { useState } from "react";
import type { EditableItemKey, InvoiceItem } from "../types/invoice";
import { InvoiceItemRow } from "./InvoiceItemRow";
import { Plus } from "lucide-react";
import { cn } from "../lib/utils";

export function HomePage() {
  const columnKeys = ["id", "name", "posting date", "price (USD)"];

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 0,
      name: "",
      postingDate: "",
      priceUSD: 0,
    },
  ]);

  const totalPrice = items.reduce((acc, item) => acc + item.priceUSD, 0);

  function updateItem<K extends EditableItemKey>(
    itemId: number,
    itemKey: K,
    value: InvoiceItem[K],
  ) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, [itemKey]: value } : item,
      ),
    );
  }

  function addItem() {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length,
        name: "",
        postingDate: "",
        priceUSD: 0,
      },
    ]);
  }

  function removeItem(itemId: number) {
    if (itemId === 0) return;
    setItems((prevItems) =>
      prevItems
        .filter((item) => item.id !== itemId)
        .map((item, index) => ({
          ...item,
          id: index,
        })),
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 my-0">
              Invoice
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Manage and track your hardware expenses
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs font-medium text-gray-500 block uppercase tracking-wider">
                Total Price
              </span>
              <span className="text-lg font-bold font-mono text-gray-900">
                $
                {totalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <button
              type="submit"
              className="py-2 px-5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left border-collapse min-w-175">
              <thead className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/80 border-b border-gray-200">
                <tr>
                  {columnKeys.map((key) => (
                    <th
                      key={String(key)}
                      className={cn(
                        "px-3 py-3",
                        key === "id" && "w-20",
                        key === "posting date" && "w-44",
                        key === "price (USD)" && "w-36",
                      )}
                    >
                      {String(key)}
                    </th>
                  ))}
                  <th className="w-12 px-3 py-3 text-center">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {items.map((item) => (
                  <InvoiceItemRow
                    item={item}
                    key={item.id}
                    onUpdate={(key, value) => updateItem(item.id, key, value)}
                    canRemove={item.id !== 0}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </tbody>
              <tfoot className="bg-gray-50/80 border-t border-gray-200 font-medium text-sm">
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 text-right text-gray-600 font-medium"
                  >
                    Total Price:
                  </td>
                  <td className="px-3 py-3 font-mono font-semibold text-gray-900">
                    <span className="text-gray-500 text-xs mr-0.5">$</span>
                    {totalPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="w-12 px-3 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={addItem}
              className="w-full py-2 px-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-gray-500" />
              Add item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
