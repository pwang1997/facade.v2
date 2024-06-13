ALTER TABLE "knowledge_planet_categories" RENAME COLUMN "user_id" TO "author_id";--> statement-breakpoint
ALTER TABLE "knowledge_planet_posts" RENAME COLUMN "user_id" TO "author_id";--> statement-breakpoint
ALTER TABLE "knowledge_planet_tags" RENAME COLUMN "user_id" TO "author_id";--> statement-breakpoint
ALTER TABLE "knowledge_planet_categories" DROP CONSTRAINT "knowledge_planet_categories_user_id_knowledge_planet_user_id_fk";
--> statement-breakpoint
ALTER TABLE "knowledge_planet_posts" DROP CONSTRAINT "knowledge_planet_posts_user_id_knowledge_planet_user_id_fk";
--> statement-breakpoint
ALTER TABLE "knowledge_planet_tags" DROP CONSTRAINT "knowledge_planet_tags_user_id_knowledge_planet_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knowledge_planet_categories" ADD CONSTRAINT "knowledge_planet_categories_author_id_knowledge_planet_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."knowledge_planet_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knowledge_planet_posts" ADD CONSTRAINT "knowledge_planet_posts_author_id_knowledge_planet_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."knowledge_planet_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knowledge_planet_tags" ADD CONSTRAINT "knowledge_planet_tags_author_id_knowledge_planet_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."knowledge_planet_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
