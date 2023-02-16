/* eslint-disable @typescript-eslint/restrict-template-expressions */
export function getBaseUrl() {
  return `${process.env.VERCEL_URL}` || "http://localhost:3000";
}
