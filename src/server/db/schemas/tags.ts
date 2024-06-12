import { sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable, } from "../schema";
import { users } from "./users";

export const tags = createTable(
    "tags",
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
    }
  );