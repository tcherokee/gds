import type { ApiResponse, FetchApiParams } from "../interfaces/common/types";

export default async function fetchApi<T = any>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: FetchApiParams): Promise<ApiResponse<T>> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
    },
  };

  const url = new URL(`${import.meta.env.API_URL}/api/${endpoint}${query}`);

  const res = await fetch(url.toString(), opts);
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data;
}
