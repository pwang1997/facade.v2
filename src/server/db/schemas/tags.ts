import { relations, sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../schema";
import { postTagAssn } from "./assn/post-tag-assn";

export const tags = createTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const tagRelations = relations(tags, ({many }) => {
  return {
    postTagAssn: many(postTagAssn),
  };
});
