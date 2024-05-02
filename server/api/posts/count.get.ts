import { count } from "drizzle-orm";

export type Post = typeof tables.posts.$inferSelect;

export default defineEventHandler(async (event): Promise<number> => {
  const totalCount = useDrizzle()
    .select({ count: count() })
    .from(tables.posts)
    .limit(1)
    .then((result) => result[0].count);

  return await totalCount;
});
