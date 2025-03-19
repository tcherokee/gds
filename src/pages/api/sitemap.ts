// src/pages/api/paginate.ts
import type { APIRoute } from "astro";
import { fetchSitemapData } from "../../../utils/fetch-sitemap-data";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const lastRecordId = url.searchParams.get("lastRecordId")
    ? Number(url.searchParams.get("lastRecordId"))
    : null;
  const totalRecords = url.searchParams.get("totalRecords")
    ? JSON.parse(url.searchParams.get("totalRecords") as string)
    : ([] as number[]);

  try {
    const response = await fetchSitemapData(totalRecords, page, lastRecordId);

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
};
