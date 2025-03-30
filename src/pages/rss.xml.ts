import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  return rss({
    title: "天方夜坛",
    description: "This is Daolan's blog",
    site: context.site!,

    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: (post.data.tags || []).join(", "),
      link: `/posts/${post.slug}/`,
    })),

    customData: `<language>zh-cn</language>`,
    stylesheet: "/rss/styles.xsl",
  });
}
