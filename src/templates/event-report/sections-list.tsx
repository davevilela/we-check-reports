import orderBy from "lodash.orderby";
import {
  SectionContext,
  useItem,
  useReport,
  useSection,
} from "./hooks/use-context";

function SectionHeader() {
  const { header } = useReport();
  const section = useSection();
  return (
    <div className="flex flex-col gap-0 border-b border-gray-300 pb-2">
      <h2 className="text-sm font-semibold">Seção: {section.section_name}</h2>
      {!!section.section_description && (
        <p className="text-sm">Descrição: {section.section_description}</p>
      )}

      {!header.hide_score && (
        <p className="text-xs font-normal text-gray-600">
          Pontuação da seção: {section.score_obtained} / {section.total_score} -{" "}
          {section.percent_score}%
        </p>
      )}
    </div>
  );
}

export function SectionItem({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-slate-300 bg-transparent p-2">
      <SectionHeader />
      {children}
    </div>
  );
}

export function SectionsList({ children }: { children?: React.ReactNode }) {
  const { sections } = useItem();

  return (
    <div className="flex w-full flex-col gap-6 p-1">
      {orderBy(sections, "position", "asc").map((section, idx) => (
        <SectionContext value={section} key={`${section.section_name}-${idx}`}>
          <SectionItem>{children}</SectionItem>
        </SectionContext>
      ))}
    </div>
  );
}
