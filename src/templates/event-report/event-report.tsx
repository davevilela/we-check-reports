import React from "react";
import { AnswerContent } from "./answer-content";
import { Header } from "./header";
import { ReportContext } from "./hooks/use-context";
import { ItemsList } from "./items-list";
import { QuestionList } from "./question-list";
import { SectionsList } from "./sections-list";
import type { EventReportData } from "./types";

export function EventReport(props: { reportData: EventReportData }) {
  return (
    <ReportContext value={props.reportData}>
      <div className="flex-co h-screen w-screen flex-1 md:p-2">
        <div className="mx-auto flex h-auto max-w-4xl flex-1 flex-col gap-8 bg-slate-100 p-4">
          <Header />
          <ItemsList>
            <SectionsList>
              <QuestionList>
                <AnswerContent />
              </QuestionList>
            </SectionsList>
          </ItemsList>
        </div>
      </div>
    </ReportContext>
  );
}
