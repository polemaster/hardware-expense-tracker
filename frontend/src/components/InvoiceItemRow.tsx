import { useEffect, useRef } from "react";
import type { EditableItemKey, InvoiceItem } from "../types/invoice";
import { InputField } from "./InputField";
import { Trash2 } from "lucide-react";

interface Props {
  item: InvoiceItem;
  onUpdate: <K extends EditableItemKey>(
    itemKey: K,
    value: InvoiceItem[K],
  ) => void;
  canRemove: boolean;
  onRemove: () => void;
}

export function InvoiceItemRow({ item, onUpdate, canRemove, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/70 transition-colors group">
      <td className="p-3 align-middle">
        <InputField
          value={item.id}
          inputType="number"
          onChange={() => {}}
          disabled={true}
        />
      </td>
      <td className="p-3 align-middle">
        <InputField
          ref={inputRef}
          value={item.name}
          inputType="text"
          onChange={(value) => onUpdate("name", value)}
        />
      </td>
      <td className="p-3 align-middle">
        <InputField
          value={item.postingDate}
          inputType="date"
          onChange={(value) => onUpdate("postingDate", value)}
          onClick={(e) => {
            try {
              e.currentTarget.showPicker?.();
            } catch {
              // Ignore unsupported environments
            }
          }}
        />
      </td>
      <td className="p-3 align-middle">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 text-xs font-medium">
            $
          </span>
          <InputField
            value={item.priceUSD === 0 ? "" : item.priceUSD}
            inputType="number"
            placeholder="0"
            onChange={(value) => onUpdate("priceUSD", Number(value))}
            className="pl-6 pr-2.5 font-mono"
          />
        </div>
      </td>

      <td className="p-3 align-middle text-center w-12">
        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          title={canRemove ? "Remove this row" : "Cannot remove row with ID 0"}
          className={`p-1.5 rounded-lg transition-colors ${
            canRemove
              ? "text-gray-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
              : "text-gray-200 cursor-not-allowed"
          }`}
          aria-label={
            canRemove ? `Delete row ${item.id}` : `Cannot delete row ${item.id}`
          }
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
