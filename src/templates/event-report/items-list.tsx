import orderBy from "lodash.orderby";
import { ItemContext, useItem, useReport } from "./hooks/use-context";

function ItemHeader() {
  const { header } = useReport();

  const {
    form_name,
    collection_item,
    percent_score,
    score_obtained,
    total_score,
  } = useItem();

  return (
    <div className="flex flex-col gap-1 border-b border-gray-300 bg-white p-2 pb-2">
      <h1 className="font-semibold">Formulário: {form_name}</h1>
      {!!collection_item?.name && (
        <div className="flex flex-col text-xs font-normal text-gray-600">
          <p>Item: {collection_item?.name}</p>
          <p>Coleção: {collection_item?.name}</p>
          <p>Item Code: {collection_item?.code}</p>
        </div>
      )}

      {!header.hide_score && (
        <p className="text-xs font-normal text-gray-600">
          Pontuação do Formulário: {score_obtained} / {total_score} -{" "}
          {percent_score}%
        </p>
      )}
    </div>
  );
}

export function FormularyItem({ children }: { children?: React.ReactNode }) {
  const item = useItem();
  return (
    <div
      className="flex flex-col gap-4 overflow-clip rounded-md border border-slate-300 bg-gray-200"
      key={item.form_name}
    >
      <ItemHeader />
      <div className="p-2">{children}</div>
    </div>
  );
}

export function ItemsList({ children }: { children?: React.ReactNode }) {
  const { body } = useReport();

  return (
    <div className="flex w-full flex-col">
      {orderBy(body.items, "position", "asc").map((item, idx) => (
        <ItemContext value={item} key={`${item.form_name}-${idx}`}>
          <FormularyItem>{children}</FormularyItem>
        </ItemContext>
      ))}
    </div>
  );
}
