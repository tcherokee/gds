import type { APIRoute } from "astro";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

export const GET: APIRoute = async ({ cookies }) => {
  const authCookie = cookies.get("_token")?.value;
  let ppToken = cookies.get("_ppToken")?.value;
  if (authCookie && !ppToken) {
    const secretKey = import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY;
    ppToken = jwt.sign(
      { username: "doyincodes", exp: dayjs().add(2, "month").unix() },
      secretKey
    );
    if (ppToken) {
      cookies.set("_ppToken", ppToken, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * (24 * 60), // 60 days
      });
    }
  }

  if (ppToken && !authCookie) {
  }

  return new Response(
    JSON.stringify({
      hasAuthCookkie: !!authCookie,
      hasPPToken: !!ppToken,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
