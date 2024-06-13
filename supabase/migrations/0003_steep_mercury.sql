ALTER TABLE "knowledge_planet_categories" DROP CONSTRAINT "knowledge_planet_categories_author_id_knowledge_planet_user_id_fk";
--> statement-breakpoint
ALTER TABLE "knowledge_planet_posts" DROP CONSTRAINT "knowledge_planet_posts_author_id_knowledge_planet_user_id_fk";
--> statement-breakpoint
ALTER TABLE "knowledge_planet_tags" DROP CONSTRAINT "knowledge_planet_tags_author_id_knowledge_planet_user_id_fk";
--> statement-breakpoint
ALTER TABLE "knowledge_planet_categories" DROP COLUMN IF EXISTS "author_id";--> statement-breakpoint
ALTER TABLE "knowledge_planet_posts" DROP COLUMN IF EXISTS "author_id";--> statement-breakpoint
ALTER TABLE "knowledge_planet_tags" DROP COLUMN IF EXISTS "author_id";