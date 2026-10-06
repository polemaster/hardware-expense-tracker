import { InvoiceHeader } from "../components/InvoiceHeader";
import { InvoiceTable } from "../components/InvoiceTable";
import { InputField } from "../components/InputField";
import { ErrorMessage } from "../components/ErrorMessage";
import { useInvoice } from "../hooks/useInvoice";

export function HomePage() {
  const {
    title,
    setTitle,
    items,
    totalPrice,
    addItem,
    updateItem,
    removeItem,
    handleSubmit,
    isSubmitting,
    error,
    clearError,
  } = useInvoice();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <form onSubmit={handleSubmit}>
        <InvoiceHeader totalPrice={totalPrice} isSubmitting={isSubmitting} />

        <div className="p-6 space-y-6">
          {error && (
            <ErrorMessage
              message={error.message}
              status={error.status}
              onDismiss={clearError}
            />
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="invoice-title"
              className="block font-medium text-gray-700"
            >
              Title
            </label>
            <InputField
              id="invoice-title"
              inputType="text"
              placeholder="Enter invoice title"
              value={title}
              onChange={setTitle}
              required
            />
          </div>

          <div className="space-y-2">
            <p className="font-medium text-gray-700">Items</p>

            <InvoiceTable
              items={items}
              totalPrice={totalPrice}
              onUpdate={updateItem}
              onRemove={removeItem}
              onAdd={addItem}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
