/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createContext } from "utils/create-context";
import type {
  EventReportData,
  ItemData,
  QuestionData,
  SectionData,
} from "../types";

export const [ReportContext, useReport] = createContext<EventReportData>();

export const [QuestionContext, useQuestion] = createContext<QuestionData>();

export const [ItemContext, useItem] = createContext<ItemData>();

export const [SectionContext, useSection] = createContext<SectionData>();
