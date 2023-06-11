// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from 'astro:content';
// 2. Define your collection(s)

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pageTitle: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    relatedPosts: z.array(reference('blog')).optional()
  })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"


export const collections = {
  'blog': blogCollection,
};