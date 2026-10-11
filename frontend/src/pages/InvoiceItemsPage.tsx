import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getInvoiceItems } from "../api/getInvoiceItems";
import { LoadingButton } from "../components/LoadingButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { InvoiceItemsToolbar } from "../components/InvoiceItemsToolbar";
import { InvoiceItemsTable } from "../components/InvoiceItemsTable";
import { InvoiceItemsEmptyState } from "../components/InvoiceItemsEmptyState";
import type { ApiError } from "../api/ApiError";
import type { InvoiceItemResponse } from "../types/responses";
import type {
  InvoiceItemSortField,
  SortDirection,
} from "../types/requests";

export function InvoiceItemsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedPostingDate, setDebouncedPostingDate] = useState("");
  const [sortBy, setSortBy] = useState<InvoiceItemSortField>("name");
  const [direction, setDirection] = useState<SortDirection>("ASC");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setDebouncedPostingDate(postingDate);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, postingDate]);

  const {
    data: items,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<InvoiceItemResponse[], ApiError>({
    queryKey: [
      "invoice-items",
      {
        name: debouncedSearch.trim() || undefined,
        postingDate: debouncedPostingDate.trim() || undefined,
        sortBy,
        direction,
      },
    ],
    queryFn: () =>
      getInvoiceItems({
        name: debouncedSearch.trim() || undefined,
        postingDate: debouncedPostingDate.trim() || undefined,
        sortBy,
        direction,
      }),
    placeholderData: keepPreviousData,
  });

  const handleToggleSort = (field: InvoiceItemSortField) => {
    if (sortBy === field) {
      setDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(field);
      setDirection("ASC");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 my-0">
            Invoice Items
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Search and sort invoice items by name and posting date
          </p>
        </div>
        <LoadingButton
          onClick={() => refetch()}
          isLoading={isFetching}
          loadingText="Refreshing..."
        >
          Refresh
        </LoadingButton>
      </div>

      <div className="p-6 space-y-5">
        <InvoiceItemsToolbar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          postingDate={postingDate}
          onPostingDateChange={setPostingDate}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          direction={direction}
          onToggleDirection={() =>
            setDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"))
          }
        />

        {isLoading && (
          <div className="text-center min-h-48 flex items-center justify-center">
            <LoadingButton isLoading>Loading...</LoadingButton>
          </div>
        )}

        {isError && (
          <ErrorMessage
            message={error?.message || "Failed to fetch invoice items"}
            status={error?.status || 500}
            onDismiss={() => refetch()}
          />
        )}

        {!isLoading && !isError && (!items || items.length === 0) && (
          <InvoiceItemsEmptyState
            searchTerm={debouncedSearch}
            postingDate={debouncedPostingDate}
          />
        )}

        {!isLoading && !isError && items && items.length > 0 && (
          <InvoiceItemsTable
            items={items}
            sortBy={sortBy}
            direction={direction}
            onToggleSort={handleToggleSort}
          />
        )}
      </div>
    </div>
  );
}
