import type { Invoice } from "../types/invoice";

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const hasPLN =
    invoice.totalPricePLN != null ||
    invoice.items?.some((item) => item.pricePLN != null);

  const formattedDate = (() => {
    if (!invoice.createdAt) return null;
    try {
      const d = new Date(invoice.createdAt);
      if (isNaN(d.getTime())) return invoice.createdAt;
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return invoice.createdAt;
    }
  })();

  const totalPrice =
    invoice.totalPrice ??
    invoice.items?.reduce((acc, item) => acc + item.priceUSD, 0) ??
    0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs">
      <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900 my-0">
              {invoice.title || `Invoice #${invoice.id}`}
            </h3>
            <span className="text-xs px-2 py-0.5 font-mono text-gray-500 bg-gray-100 rounded">
              #{invoice.id}
            </span>
          </div>
          {formattedDate && (
            <p className="text-xs text-gray-500 m-0">
              Created on {formattedDate}
            </p>
          )}
        </div>

        <div className="text-right">
          <span className="text-xs font-medium text-gray-500 block uppercase tracking-wider">
            Total Price
          </span>
          <span className="text-base font-bold font-mono text-gray-900">
            $
            {totalPrice.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          {invoice.totalPricePLN != null && (
            <span className="text-xs text-gray-500 block font-mono">
              ~{" "}
              {invoice.totalPricePLN.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              PLN
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        {invoice.items && invoice.items.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left border-collapse min-w-140">
              <thead className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/80 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2.5 w-14">#</th>
                  <th className="px-3 py-2.5">name</th>
                  <th className="px-3 py-2.5 w-40">posting date</th>
                  <th className="px-3 py-2.5 w-32">price (USD)</th>
                  {hasPLN && <th className="px-3 py-2.5 w-32">price (PLN)</th>}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {invoice.items.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="p-3 text-sm text-gray-500 font-mono">
                      {index + 1}
                    </td>
                    <td className="p-3 text-sm text-gray-900 font-medium">
                      {item.name}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {item.postingDate}
                    </td>
                    <td className="p-3 text-sm text-gray-900 font-mono">
                      $
                      {item.priceUSD.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    {hasPLN && (
                      <td className="p-3 text-sm text-gray-900 font-mono">
                        {item.pricePLN != null
                          ? `${item.pricePLN.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })} PLN`
                          : "-"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50/80 border-t border-gray-200 font-medium text-sm">
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-2.5 text-right text-gray-600 font-medium"
                  >
                    Total Price:
                  </td>
                  <td className="px-3 py-2.5 font-mono font-semibold text-gray-900">
                    <span className="text-gray-500 text-xs mr-0.5">$</span>
                    {totalPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  {hasPLN && (
                    <td className="px-3 py-2.5 font-mono font-semibold text-gray-900">
                      {invoice.totalPricePLN != null
                        ? `${invoice.totalPricePLN.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })} PLN`
                        : ""}
                    </td>
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="text-xs text-gray-400 text-center py-4 my-0">
            No items in this invoice
          </p>
        )}
      </div>
    </div>
  );
}
