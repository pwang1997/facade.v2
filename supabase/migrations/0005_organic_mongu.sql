ALTER TABLE "knowledge_planet_session" RENAME COLUMN "sessionToken" TO "session_token";--> statement-breakpoint
ALTER TABLE "knowledge_planet_session" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" RENAME COLUMN "emailVerified" TO "provider_account_id";--> statement-breakpoint
ALTER TABLE "knowledge_planet_session" DROP CONSTRAINT "knowledge_planet_session_userId_knowledge_planet_user_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "session_userId_idx";--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ALTER COLUMN "provider_account_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ALTER COLUMN "provider_account_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ALTER COLUMN "provider_account_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knowledge_planet_session" ADD CONSTRAINT "knowledge_planet_session_user_id_knowledge_planet_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."knowledge_planet_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "knowledge_planet_session" ("user_id");--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" DROP COLUMN IF EXISTS "providerAccountId";