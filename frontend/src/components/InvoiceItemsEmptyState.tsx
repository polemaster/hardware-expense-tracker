import { formatDate } from "../lib/utils";

interface InvoiceItemsEmptyStateProps {
  searchTerm?: string;
  postingDate?: string;
}

export function InvoiceItemsEmptyState({
  searchTerm,
  postingDate,
}: InvoiceItemsEmptyStateProps) {
  return (
    <div className="text-center py-12 flex flex-col items-center justify-center gap-3">
      <p className="text-sm text-gray-500 my-0">
        {searchTerm && postingDate ? (
          <>
            No invoice items matching &ldquo;
            <span className="font-semibold text-gray-700">{searchTerm}</span>
            &rdquo; with posting date{" "}
            <span className="font-semibold text-gray-700">
              {formatDate(postingDate)}
            </span>
          </>
        ) : searchTerm ? (
          <>
            No invoice items matching &ldquo;
            <span className="font-semibold text-gray-700">{searchTerm}</span>
            &rdquo;
          </>
        ) : postingDate ? (
          <>
            No invoice items matching posting date{" "}
            <span className="font-semibold text-gray-700">
              {formatDate(postingDate)}
            </span>
          </>
        ) : (
          "No invoice items found"
        )}
      </p>
    </div>
  );
}
