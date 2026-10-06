interface InvoiceHeaderProps {
  totalPrice: number;
  isSubmitting: boolean;
}

export function InvoiceHeader({
  totalPrice,
  isSubmitting,
}: InvoiceHeaderProps) {
  return (
    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 my-0">Invoice</h2>
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
          disabled={isSubmitting}
          className="py-2 px-5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
