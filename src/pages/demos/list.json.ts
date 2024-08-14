import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const res = new Response(
    JSON.stringify({
      name: "Astro",
      url: "https://astro.build/",
      params,
      requestUrl: request.url,
    }),
  );
  res.headers.set("Content-Type", "application/json");
  return res;
};
