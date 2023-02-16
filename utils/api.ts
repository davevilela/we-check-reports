import axios from "axios";
import { env } from "src/env.mjs";

export const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    Authorization: env.API_AUTHORIZATION_TOKEN,
  },
});
