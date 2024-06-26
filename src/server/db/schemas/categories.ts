import { relations, sql } from "drizzle-orm";
import { index, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../schema";
import { postCategoryAssn } from "./assn/post-category-assn";

export const categories = createTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    parentId : serial("parent_id").default(sql`NULL`), // self-reference
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (category) => ({
    nameIndex: index("name_idx").on(category.name),
  }),
);

export const categoryRelations = relations(categories, ({ many }) => {
  return {
    postCategoryAssn: many(postCategoryAssn),
  };
});