import type { Post as DBPost, User as DBUser } from "~/server/utils/drizzle";

export interface Post extends Partial<DBPost> {}
export interface User extends Partial<DBUser> {}

export type PostWithUser = Post & { user: User };
