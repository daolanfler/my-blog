import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get() {
  const posts = await getCollection("blog");
  return rss({
    title: "天方夜坛",
    description: "daolanfler's blog",
    site: "https://daolanfler.xyz",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      // description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
