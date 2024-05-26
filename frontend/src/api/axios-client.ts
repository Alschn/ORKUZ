import axios from "axios";
import { env } from "~/env.js";

const axiosConfig = {
  headers: { "Content-Type": "application/json" },
  baseURL: env.NEXT_PUBLIC_API_URL,
};

const axiosClient = axios.create(axiosConfig);

export default axiosClient;
