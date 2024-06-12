import { sql } from "drizzle-orm";
import { index, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable, } from "../schema";
import { users } from "./users";

export const categories = createTable(
    "categories",
    {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 256 }).notNull(),
      userId: varchar("user_id", { length: 255 })
        .notNull()
        .references(() => users.id,  { onDelete: 'cascade' }),
      createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
      updatedAt: timestamp("updated_at", { withTimezone: true }),
    },
    (category) => ({
      nameIndex: index("name_idx").on(category.name)
    })
  );