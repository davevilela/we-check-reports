import axios from "axios";
import { env } from "src/env.mjs";

export const getApi = (workspaceSlug: string) => {
  const url = env.API_URL || "";

  const parsedUrl = url.replace("{{WORKSPACE}}", workspaceSlug);

  const isntance = axios.create({
    baseURL: parsedUrl,
    headers: {
      Authorization: env.API_AUTHORIZATION_TOKEN,
    },
  });

  return isntance
};

export const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    Authorization: env.API_AUTHORIZATION_TOKEN,
  },
});
