import { InvoiceHeader } from "../components/InvoiceHeader";
import { InvoiceTable } from "../components/InvoiceTable";
import { useInvoice } from "../hooks/useInvoice";

export function HomePage() {
  const { items, totalPrice, addItem, updateItem, removeItem, handleSubmit } =
    useInvoice();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <form onSubmit={handleSubmit}>
        <InvoiceHeader totalPrice={totalPrice} />

        <div className="p-6 space-y-4">
          <InvoiceTable
            items={items}
            totalPrice={totalPrice}
            onUpdate={updateItem}
            onRemove={removeItem}
            onAdd={addItem}
          />
        </div>
      </form>
    </div>
  );
}
