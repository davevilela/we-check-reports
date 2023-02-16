export type EventStatus =
  | "pending"
  | "draft"
  | "done"
  | "started"
  | "rescheduled"
  | "incomplete"
  | "delayed";

export type CollectionItemPropertiesData = {
  name: string;
  content: string;
};

export type CollectionItemData = {
  code: string;
  description: string;
  name: string;
  collection: string;
  properties: CollectionItemPropertiesData[];
};

export type QuestionType =
  | "checkbox"
  | "integer"
  | "decimal"
  | "hour"
  | "money"
  | "radio"
  | "radio_combo"
  | "checkbox_combo"
  | "picture"
  | "gallery"
  | "collections"
  | "geolocation"
  | "date"
  | "signature"
  | "action_plan"
  | "text"
  | "barcode"
  | "chronometer"
  | "car_plate"
  | "time_picker"
  | "paragraph"
  | "task_button"
  | "code_generator";

export type QuestionData = {
  name: string;
  type: QuestionType;
  position: number;
  weight: number;
  score_obtained: number;
  likes: number;
  dislikes: number;
  answers: Array<AnswerData>;
};

export type AnswerData = {
  id: string;
  option: string | null;
  red_flag: string | null;
  content: string | null;
  comment: string | null;
  position: number;
  score: number;
  collection_item: CollectionItemData;
};

export type SectionData = {
  section_name: string;
  section_description: string;
  position: number;
  total_score: number;
  score_obtained: number;
  percent_score: number;
  questions: QuestionData[];
};

export type ItemData = {
  collection_item: CollectionItemData;
  form_name: string;
  position: number;
  total_score: number;
  score_obtained: number;
  percent_score: number;
  collection_item_name: string;
  sections: SectionData[];
};

export type LocalData = {
  name: string;
  city: string;
  state: string;
  address: string;
};

export type HeaderData = {
  hide_score: boolean;
  logo: string;
  status: EventStatus;
  fantasy_name: string;
  company_name: string;
  document: string;
  address: string;
  event_name: string;
  event_id: string;
  event_date_time: string;
  event_type: string;
  author_full_name: string;
  author_email: string;
  total_score: number;
  score_obtained: number;
  percent_score: number;
  local: LocalData;
};

export type EventReportData = {
  header: HeaderData;
  body: {
    items: ItemData[];
  };
};

export type EventReportResponse = {
  header: HeaderData;
  body: ItemData[];
};
