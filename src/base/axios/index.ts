import axios, { AxiosError } from "axios";

type APIError = {
  status: boolean;
  message: string;
};

export const handleAxiosError = (error: AxiosError<APIError>) => {
  console.log(error);

  if (error.response) {
    return error.response.data.message;
  }

  if (error.request) {
    return `Bad Request: ${error.request}`;
  }

  return `Error: ${error.message}`;
};

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(handleAxiosError(error))
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(handleAxiosError(error))
);

export default Axios;
