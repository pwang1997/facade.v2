import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createTable } from "../schema";
import { categories } from "./categories";
import { tags } from "./tags";

export const posts = createTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("name", { length: 256 }).notNull().unique(),
    published: boolean("published"),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (post) => ({
    titleIndex: index("title_idx").on(post.title),
  }),
);

export const postRelations = relations(posts, ({ many }) => {
  return {
    categories: many(categories),
    tags: many(tags),
  };
});
