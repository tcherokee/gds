import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const searchString = url.search;
  const opts = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/api/sports${searchString}`,
      opts
    );

    // Handle the response if it's not ok
    if (!res.ok) {
      // Potentially parse error details here and pass them to the error function
      throw new Error(`API responded with status: ${res.status}`);
    }

    // return new Response(JSON.stringify(data), { status: 200 })
    // Stream the response to the client without converting to JSON and back
    return new Response(res.body, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify(e), {
      status: 500,
    });
  }
};
