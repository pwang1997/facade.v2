CREATE TABLE IF NOT EXISTS "knowledge_planet_postCategoryAssn" (
	"post_id" serial NOT NULL,
	"category_id" serial NOT NULL,
	CONSTRAINT "knowledge_planet_postCategoryAssn_post_id_category_id_pk" PRIMARY KEY("post_id","category_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "knowledge_planet_postTagAssn" (
	"post_id" serial NOT NULL,
	"tag_id" serial NOT NULL,
	CONSTRAINT "knowledge_planet_postTagAssn_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knowledge_planet_postCategoryAssn" ADD CONSTRAINT "knowledge_planet_postCategoryAssn_post_id_knowledge_planet_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."knowledge_planet_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knowledge_planet_postCategoryAssn" ADD CONSTRAINT "knowledge_planet_postCategoryAssn_category_id_knowledge_planet_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."knowledge_planet_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knowledge_planet_postTagAssn" ADD CONSTRAINT "knowledge_planet_postTagAssn_post_id_knowledge_planet_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."knowledge_planet_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knowledge_planet_postTagAssn" ADD CONSTRAINT "knowledge_planet_postTagAssn_tag_id_knowledge_planet_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."knowledge_planet_tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
