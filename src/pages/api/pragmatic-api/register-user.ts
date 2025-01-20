import type { APIRoute } from "astro";
import CryptoJS from "crypto-js";

export const POST: APIRoute = async ({ request }) => {
  let payload = await request.json();
  let requestString = "";
  let sortedKeys = Object.keys(payload).sort();
  sortedKeys.forEach((key, index) => {
    requestString += `${key}=${payload[key]}`;
    if (index < sortedKeys.length - 1) {
      requestString += "+";
    }
  });
  requestString += "+" + import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY;
  const hash = CryptoJS.MD5(requestString).toString();
  payload = {
    ...payload,
    hash,
  };
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${import.meta.env.PUBLIC_TOURNAMENT_AUTH_TOKEN}`,
      license: `${import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY}`,
    },
    body: JSON.stringify(payload),
  };

  console.log(payload);

  const res = await fetch(
    `${import.meta.env.PUBLIC_TOURNAMENT_API_URL}registerUser`,
    opts
  );
  const data = await res.json();

  return new Response(
    JSON.stringify({
      ...data,
    })
  );
};
