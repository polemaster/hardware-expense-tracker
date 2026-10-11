import {
  Search,
  Calendar,
  X,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
} from "lucide-react";
import type {
  InvoiceItemSortField,
  SortDirection,
} from "../types/requests";

interface InvoiceItemsToolbarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  postingDate: string;
  onPostingDateChange: (value: string) => void;
  sortBy: InvoiceItemSortField;
  onSortByChange: (field: InvoiceItemSortField) => void;
  direction: SortDirection;
  onToggleDirection: () => void;
}

export function InvoiceItemsToolbar({
  searchTerm,
  onSearchTermChange,
  postingDate,
  onPostingDateChange,
  sortBy,
  onSortByChange,
  direction,
  onToggleDirection,
}: InvoiceItemsToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-gray-50/70 p-3.5 rounded-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            placeholder="Search items by name..."
            className="w-full pl-9 pr-8 py-2 text-sm text-gray-700 bg-white placeholder-gray-400 border border-gray-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            aria-label="Search items by name"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchTermChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded cursor-pointer"
              title="Clear name search"
              aria-label="Clear name search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative sm:w-48">
          <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="date"
            value={postingDate}
            onChange={(e) => onPostingDateChange(e.target.value)}
            onClick={(e) => {
              try {
                e.currentTarget.showPicker?.();
              } catch {
                // Ignore unsupported environments
              }
            }}
            className="w-full pl-9 pr-8 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer"
            aria-label="Search items by posting date"
            title="Search by posting date"
          />
          {postingDate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPostingDateChange("");
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded cursor-pointer z-10"
              title="Clear date filter"
              aria-label="Clear date filter"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Sort:</span>
        </div>

        <select
          value={sortBy}
          onChange={(e) =>
            onSortByChange(e.target.value as InvoiceItemSortField)
          }
          className="py-2 px-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer"
          aria-label="Sort by field"
        >
          <option value="name">Name</option>
          <option value="postingDate">Posting Date</option>
        </select>

        <button
          type="button"
          onClick={onToggleDirection}
          className="py-2 px-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          title={`Switch to ${direction === "ASC" ? "Descending" : "Ascending"}`}
          aria-label={`Sort direction: ${direction === "ASC" ? "Ascending" : "Descending"}`}
        >
          {direction === "ASC" ? (
            <>
              <ArrowUp className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Ascending</span>
            </>
          ) : (
            <>
              <ArrowDown className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Descending</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
