import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const form_data = await request.formData();
  const message = form_data.get("message");
  const firstName = form_data.get("firstName");
  const lastName = form_data.get("lastName");
  const email = form_data.get("email");
  const phone = form_data.get("phone");
  // Validate the data - you'll probably want to do more than this
  if (!message || !firstName || !lastName || !email || !phone) {
    return new Response(
      JSON.stringify({
        message: "All fields are required",
      }),
      { status: 400 }
    );
  }
  // Do something with the data, then return a success response
  const form = {
    formName: "Contact Form",
    formData: {
      message,
      firstName,
      lastName,
      email,
      phone,
    },
  };
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify(form),
  };
  const res = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/api/ezforms/submit`,
    opts
  );
  const data = await res.json();
  return new Response(
    JSON.stringify({
      message: "Success!",
      data,
    }),
    { status: 200 }
  );
};
