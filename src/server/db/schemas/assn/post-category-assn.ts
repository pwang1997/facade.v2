import { relations } from "drizzle-orm";
import { primaryKey, serial } from "drizzle-orm/pg-core";
import { createTable } from "../../schema";
import { categories } from "../categories";
import { posts } from "../posts";

export const postCategoryAssn = createTable(
  "postCategoryAssn",
  {
    postId: serial("post_id")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: serial("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  },
);

export const postCategoryAssnRelations = relations(
  postCategoryAssn,
  ({ one }) => ({
    post: one(posts, {
      fields: [postCategoryAssn.postId],
      references: [posts.id],
    }),
    category: one(categories, {
      fields: [postCategoryAssn.categoryId],
      references: [categories.id],
    }),
  }),
);
