/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { GetServerSideProps } from "next";
import React from "react";
import { env } from "src/env.mjs";
import { EventReport } from "src/templates/event-report/event-report";
import type { EventReportResponse } from "src/templates/event-report/types";
import { api } from "utils/api";

export default function Page(props: { report: EventReportResponse }) {
  const { report } = props;
  return (
    <EventReport
      reportData={{
        body: {
          items: report.body,
        },
        header: report.header,
      }}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const reportId = params?.id;

  if (!reportId) {
    return {
      notFound: true,
      props: {},
    };
  }

  console.log(env.API_URL, "f=-sdflskj");

  const { data, status } = await api.get<EventReportResponse>(
    `pdf_json_by_export_id?export_id=${reportId}`
  );

  if (status !== 200) throw new Error("INVALID_DATA");

  return {
    props: { report: data },
  };
};
