import type { FetchApiParams } from "../interfaces/common/types";

const fetchApi = async <T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: FetchApiParams): Promise<T> => {
  let modifiedEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;

  const opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
    },
  };

  const url = new URL(
    `${import.meta.env.API_URL}/api/${modifiedEndpoint}${query}`
  );

  console.log('url', url)
  const res = await fetch(url.toString(), opts);
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data;
};

export default fetchApi;
