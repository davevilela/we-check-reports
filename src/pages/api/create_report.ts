/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createId } from "@paralleldrive/cuid2";
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

import { getBaseUrl } from "utils/get-base-url";

async function exportPdf(params: { reportId: string }) {
  const { reportId } = params;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = `${getBaseUrl()}/reports/${reportId}`;

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const res = await page.pdf({
    path: `/tmp/${createId()}.pdf`,
    printBackground: true,
    format: "letter",
  });

  await browser.close();

  return res;
}

export type CreateReportPayload = {
  reportId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
  }
  const pdf = await exportPdf(req.body as CreateReportPayload);

  res.status(201).send(pdf);
}
