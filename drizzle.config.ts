import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schemas/*",
  out: './supabase/migrations',
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["knowledge_planet_*"],
  verbose : true,
  strict : true
} satisfies Config;
