import { primaryKey, serial } from "drizzle-orm/pg-core";
import { createTable } from "../../schema";
import { posts } from "../posts";
import { tags } from "../tags";

export const postTagAssn = createTable(
  "postTagAssn",
  {
    postId: serial("post_id")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    tagId: serial("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.tagId] }),
    };
  },
);
