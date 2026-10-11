import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { InvoiceItemResponse } from "../types/responses";
import type {
  InvoiceItemSortField,
  SortDirection,
} from "../types/requests";
import {
  getInvoiceItemsTotalUSD,
  getInvoiceItemsTotalPLN,
} from "../lib/utils";
import { InvoiceItemsTableRow } from "./InvoiceItemsTableRow";

interface InvoiceItemsTableProps {
  items: InvoiceItemResponse[];
  sortBy: InvoiceItemSortField;
  direction: SortDirection;
  onToggleSort: (field: InvoiceItemSortField) => void;
}

export function InvoiceItemsTable({
  items,
  sortBy,
  direction,
  onToggleSort,
}: InvoiceItemsTableProps) {
  const totalPriceUSD = getInvoiceItemsTotalUSD(items);
  const totalPricePLN = getInvoiceItemsTotalPLN(items);
  const hasPLN = items.some((item) => item.costPLN != null);

  const renderSortIcon = (field: InvoiceItemSortField) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />;
    }
    return direction === "ASC" ? (
      <ArrowUp className="w-3.5 h-3.5 text-indigo-600" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-indigo-600" />
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left border-collapse min-w-140">
        <thead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50/80 border-b border-gray-200">
          <tr>
            <th className="px-3 py-2.5 w-14 font-semibold">#</th>

            <th
              onClick={() => onToggleSort("name")}
              className="px-3 py-2.5 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-100/80 transition-colors cursor-pointer select-none"
              title="Click to sort by Name"
            >
              <div className="flex items-center gap-1.5">
                <span>Name</span>
                {renderSortIcon("name")}
              </div>
            </th>

            <th
              onClick={() => onToggleSort("postingDate")}
              className="px-3 py-2.5 w-40 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-100/80 transition-colors cursor-pointer select-none"
              title="Click to sort by Posting Date"
            >
              <div className="flex items-center gap-1.5">
                <span>Posting Date</span>
                {renderSortIcon("postingDate")}
              </div>
            </th>

            <th className="px-3 py-2.5 w-32 font-semibold">Price (USD)</th>
            {hasPLN && (
              <th className="px-3 py-2.5 w-32 font-semibold">Price (PLN)</th>
            )}
            <th className="px-3 py-2.5 w-24 font-semibold">Invoice</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {items.map((item, index) => (
            <InvoiceItemsTableRow
              key={`${item.invoiceId}-${item.name}-${index}`}
              item={item}
              index={index}
              hasPLN={hasPLN}
            />
          ))}
        </tbody>
        <tfoot className="bg-gray-50/80 border-t border-gray-200 font-medium text-sm">
          <tr>
            <td
              colSpan={3}
              className="px-4 py-2.5 text-right text-gray-600 font-medium"
            >
              Total ({items.length} {items.length === 1 ? "item" : "items"}):
            </td>
            <td className="px-3 py-2.5 font-mono font-semibold text-gray-900">
              <span className="text-gray-500 text-xs mr-0.5">$</span>
              {totalPriceUSD.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            {hasPLN && (
              <td className="px-3 py-2.5 font-mono font-semibold text-gray-900">
                {totalPricePLN.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                PLN
              </td>
            )}
            <td className="px-3 py-2.5" />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
