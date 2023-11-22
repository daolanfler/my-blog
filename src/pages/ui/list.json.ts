import type { APIRoute } from "astro";

// Outputs: /builtwith.json
export const get: APIRoute = async  ({params, request}) => {
    

    return {
      body: JSON.stringify({
        name: 'Astro',
        url: 'https://astro.build/',
      }),
    };
  }