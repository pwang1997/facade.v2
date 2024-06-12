import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createTable } from "../schema";
import { users } from "./users";

export const posts = createTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("name", { length: 256 }).notNull(),
    published: boolean("published"),
    content: text("content").notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (post) => ({
    titleIndex: index("title_idx").on(post.title),
  }),
);
