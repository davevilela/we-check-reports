/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { GetServerSideProps } from "next";
import React from "react";
import { EventReport } from "src/templates/event-report/event-report";
import type { EventReportResponse } from "src/templates/event-report/types";
import { getApi } from "utils/api";

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
  const workspaceSlug = params?.workspaceSlug;

  if (!reportId || !workspaceSlug) {
    return {
      notFound: true,
      props: {},
    };
  }

  const { data, status } = await getApi(
    workspaceSlug.toString()
  ).get<EventReportResponse>(`pdf_json_by_export_id?export_id=${reportId}`);

  if (status !== 200) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    props: { report: data },
  };
};
