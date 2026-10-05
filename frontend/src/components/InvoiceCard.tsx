import { useState } from "react";
import type { EditableItemKey, Invoice, InvoiceItem } from "../types/invoice";
import { InvoiceItemRow } from "./InvoiceItemRow";

export function InvoiceCard() {
  const columnKeys = ["id", "name", "posting date", "price (USD)"];

  // const [invoice, setInvoice] = useState<Invoice>({
  //   id: 0,
  //   title: "First invoice",
  //   items: [],
  //   createdAt: "",
  // });
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 0,
      name: "",
      postingDate: "",
      priceUSD: 0,
    },
  ]);

  function updateItem<K extends EditableItemKey>(
    itemId: number,
    itemKey: K,
    value: InvoiceItem[K],
  ) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, [itemKey]: value } : item,
      ),
    );
  }

  return (
    <div className="border w-1/2 m-auto flex-center flex-col">
      <h2>Invoice</h2>

      <form
        // onSubmit={onSubmit}
        className="p-4 shadow-lg rounded "
      >
        {/* <div className="overflow-x-auto my-5 flex-center"> */}
        <div className="overflow-x-auto">
          {/* <table className="text-center"> */}
          <table className="w-full text-left border-collapse min-w-175">
            <thead className="text-sm uppercase border-b border-neutral-300">
              <tr>
                {columnKeys.map((key) => (
                  <th key={String(key)} className="px-4 py-3 min-w-24">
                    {String(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="h-3">
                <td colSpan={columnKeys.length}></td>
              </tr>
              {items.map((item) => (
                <InvoiceItemRow
                  item={item}
                  key={item.id}
                  onUpdate={(key, value) => updateItem(item.id, key, value)}
                  canRemove={false}
                  onRemove={() => {}}
                />
              ))}
              {/* {data.map((row, rowIndex) => ( */}
              {/*   <tr key={rowIndex} className=""> */}
              {/*     {columnKeys.map((key) => ( */}
              {/*       <td key={String(key)} className="px-4 py-2"> */}
              {/*         {renderers[key] */}
              {/*           ? renderers[key]!(row[key], row) */}
              {/*           : (row[key] as React.ReactNode)} */}
              {/*       </td> */}
              {/*     ))} */}
              {/*   </tr> */}
              {/* ))} */}
            </tbody>
          </table>
        </div>

        <button className="mt-4 w-full h-10 bg-neutral-300 hover:bg-neutral-400 font-semibold rounded transition duration-100 cursor-pointer">
          Add item
        </button>

        <button
          type="submit"
          className="mt-4 w-full h-10 bg-neutral-300 hover:bg-neutral-400 font-semibold rounded transition duration-100 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
