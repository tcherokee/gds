import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, request }) => {
  const payload = await request.json();
  const body = {
    data: {
      ...payload,
    },
  };

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/user-message-actions`,
    opts
  );
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
};

export const GET: APIRoute = async ({ cookies }) => {
  const opts = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("_token")?.value}`,
    },
  };

  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_URL}/api/user-message-actions`,
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
