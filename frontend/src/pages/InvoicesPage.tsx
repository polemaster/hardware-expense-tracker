import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../api/invoices";
import { LoadingButton } from "../components/LoadingButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { InvoiceCard } from "../components/InvoiceCard";
import type { ApiError } from "../api/ApiError";

export function InvoicesPage() {
  const {
    data: invoices,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  const apiError = error as ApiError | null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 my-0">
          Invoice Page
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Manage and track your hardware expenses
        </p>
      </div>

      <div className="p-6">
        {isLoading && (
          <div className="text-center min-h-48 flex items-center justify-center">
            <LoadingButton isLoading>Loading...</LoadingButton>
          </div>
        )}

        {isError && (
          <ErrorMessage
            message={
              apiError?.message || error?.message || "Failed to fetch invoices"
            }
            status={apiError?.status || 500}
            onDismiss={() => refetch()}
          />
        )}

        {!isLoading && !isError && (!invoices || invoices.length === 0) && (
          <div className="text-center text-sm text-gray-400 min-h-48 flex items-center justify-center">
            No content yet
          </div>
        )}

        {!isLoading && !isError && invoices && invoices.length > 0 && (
          <div className="space-y-6">
            {invoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
