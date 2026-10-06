import { Plus } from "lucide-react";
import type { EditableItemKey, InvoiceItem } from "../types/invoice";
import { InvoiceItemRow } from "./InvoiceItemRow";
import { cn } from "../lib/utils";

const COLUMN_NAMES = ["#", "name", "posting date", "price (USD)"] as const;

const COLUMN_CLASSES: Record<string, string> = {
  "#": "w-18",
  name: "",
  "posting date": "w-44",
  "price (USD)": "w-36",
};

interface InvoiceTableProps {
  items: InvoiceItem[];
  totalPrice: number;
  onUpdate: <K extends EditableItemKey>(
    id: string,
    key: K,
    val: InvoiceItem[K],
  ) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export function InvoiceTable({
  items,
  totalPrice,
  onUpdate,
  onRemove,
  onAdd,
}: InvoiceTableProps) {
  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse min-w-175">
          <thead className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/80 border-b border-gray-200">
            <tr>
              {COLUMN_NAMES.map((key) => (
                <th key={key} className={cn("px-3 py-3", COLUMN_CLASSES[key])}>
                  {key}
                </th>
              ))}
              <th className="w-12 px-3 py-3 text-center">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {items.map((item, index) => (
              <InvoiceItemRow
                key={item.id}
                lineNumber={index + 1}
                item={item}
                canRemove={items.length > 1}
                onUpdate={(key, val) => onUpdate(item.id, key, val)}
                onRemove={() => onRemove(item.id)}
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
              <td className="w-12 px-3 py-3" />
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="w-full py-2 px-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Plus className="w-4 h-4 text-gray-500" />
        Add item
      </button>
    </>
  );
}
