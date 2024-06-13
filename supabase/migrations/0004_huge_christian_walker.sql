DROP TABLE "knowledge_planet_account";--> statement-breakpoint
DROP TABLE "knowledge_planet_verificationToken";--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "type" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "provider" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "providerAccountId" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "access_token" text;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "expires_at" integer;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "token_type" varchar(255);--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "scope" varchar(255);--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "id_token" text;--> statement-breakpoint
ALTER TABLE "knowledge_planet_user" ADD COLUMN "session_state" varchar(255);