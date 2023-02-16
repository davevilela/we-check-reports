/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createId } from "@paralleldrive/cuid2";
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import logger from "pino";

import { getBaseUrl } from "utils/get-base-url";
import { z } from "zod";

const createReportSchema = z.object({
  exportId: z.string(),
  workspace: z.string(),
});

export type CreateReportPayload = z.infer<typeof createReportSchema>;

async function exportPdf(params: CreateReportPayload) {
  const { exportId, workspace } = params;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = `${getBaseUrl()}/reports/${workspace}/${exportId}`;

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
    }

    createReportSchema.parse(req.body);

    console.log("[REQUEST BODY]", req.body);

    const pdf = await exportPdf(req.body as CreateReportPayload);

    res.status(201).send(pdf);
  } catch (e) {
    console.log("[REQUEST ERROR]", e);

    return res.status(400).send(e);
  }
}
