import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  // Authentication logic
  const authCookie = context.cookies.get("_token")?.value;
  const pathname = context.url.pathname;
  const dashboardIndex = pathname.split("/").indexOf("dashboard");
  const authenticationIndex = pathname.split("/").indexOf("authentication");

  if (authCookie && (authenticationIndex === 2 || authenticationIndex === 1)) {
    return Response.redirect(new URL("/dashboard", context.url), 302);
  }
  if (!authCookie && (dashboardIndex === 2 || dashboardIndex === 1)) {
    return Response.redirect(
      new URL("/authentication/login", context.url),
      302
    );
  }

  // return a Response or the result of calling `next()`
  return next();
});
