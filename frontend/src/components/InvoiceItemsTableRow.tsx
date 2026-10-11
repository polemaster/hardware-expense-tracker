import type { InvoiceItemResponse } from "../types/responses";
import { formatDate } from "../lib/utils";

interface InvoiceItemsTableRowProps {
  item: InvoiceItemResponse;
  index: number;
  hasPLN: boolean;
}

export function InvoiceItemsTableRow({
  item,
  index,
  hasPLN,
}: InvoiceItemsTableRowProps) {
  return (
    <tr className="hover:bg-gray-50/70 transition-colors">
      <td className="p-3 text-sm text-gray-500 font-mono">{index + 1}</td>
      <td className="p-3 text-sm text-gray-900 font-medium">{item.name}</td>
      <td className="p-3 text-sm text-gray-600">
        {formatDate(item.postingDate)}
      </td>
      <td className="p-3 text-sm text-gray-900 font-mono">
        $
        {item.costUSD.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      {hasPLN && (
        <td className="p-3 text-sm text-gray-900 font-mono">
          {item.costPLN != null
            ? `${item.costPLN.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} PLN`
            : "-"}
        </td>
      )}
      <td className="p-3 text-sm">
        <span className="text-xs px-2 py-0.5 font-mono text-gray-600 bg-gray-100 rounded">
          #{item.invoiceId}
        </span>
      </td>
    </tr>
  );
}
