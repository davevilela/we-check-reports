/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createId } from "@paralleldrive/cuid2";
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

import treeKill from "tree-kill";

import { getBaseUrl } from "utils/get-base-url";
import { z } from "zod";

const createReportSchema = z.object({
  exportId: z.string(),
  workspace: z.string(),
});

export type CreateReportPayload = z.infer<typeof createReportSchema>;

async function exportPdf(params: CreateReportPayload) {
  const { exportId, workspace } = params;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const url = `${getBaseUrl()}/reports/${workspace}/${exportId}`;

  console.log("[requesting url:]", url);

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const res = await page.pdf({
    path: `/tmp/${createId()}.pdf`,
    printBackground: true,
    format: "A4",
  });

  const process = browser.process()?.pid;

  if (process) {
    treeKill(process, "SIGKILL");
  }

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

    console.log("[REQUEST BODY]", JSON.parse(req.body));

    createReportSchema.parse(JSON.parse(req.body));

    const pdf = await exportPdf(req.body as CreateReportPayload);

    res.status(201).send(pdf);
  } catch (e) {
    console.log("[REQUEST ERROR]", e);

    return res.status(400).send(e);
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
