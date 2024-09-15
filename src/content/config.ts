// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from "astro:content";

// 2. Define your collection(s)

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pageTitle: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().transform((v) => new Date(v.valueOf() - 8 * 60 * 60 * 1000)), // 东八区 to UTC
    updateDate: z
      .date()
      .transform((v) => new Date(v.valueOf() - 8 * 60 * 60 * 1000))
      .optional(), // 东八区 to UTC
    relatedPosts: z.array(reference("blog")).optional(),
    draft: z.boolean().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"

export const collections = {
  blog: blogCollection,
};
