/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gqm_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gqm_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gqm_restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_all_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_allergens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_categories_titles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_companies_langs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_items_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_items_descriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_items_restaurants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_items_titles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_options_titles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_restaurants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_restaurants_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_restaurants_subtitles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_restaurants_titles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_translations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `m_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `migrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `o` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_methods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `restaurantId` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."categories" DROP CONSTRAINT "categories_companies_id_fk";

-- DropForeignKey
ALTER TABLE "public"."companies" DROP CONSTRAINT "companies_rates_id_fk";

-- DropForeignKey
ALTER TABLE "public"."gqm_category" DROP CONSTRAINT "gqm_category_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."gqm_item" DROP CONSTRAINT "gqm_item_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."gqm_item" DROP CONSTRAINT "gqm_item_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_allergens" DROP CONSTRAINT "m_allergens_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_categories" DROP CONSTRAINT "m_categories_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_categories_titles" DROP CONSTRAINT "m_categories_titles_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_companies_langs" DROP CONSTRAINT "m_companies_langs_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_contacts" DROP CONSTRAINT "m_contacts_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_events" DROP CONSTRAINT "m_events_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_items" DROP CONSTRAINT "m_items_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_items_categories" DROP CONSTRAINT "m_items_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_items_categories" DROP CONSTRAINT "m_items_categories_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_items_descriptions" DROP CONSTRAINT "m_items_descriptions_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_items_restaurants" DROP CONSTRAINT "m_items_restaurants_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_items_restaurants" DROP CONSTRAINT "m_items_restaurants_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_items_titles" DROP CONSTRAINT "m_items_titles_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_messages" DROP CONSTRAINT "m_messages_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_options" DROP CONSTRAINT "m_options_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_options_titles" DROP CONSTRAINT "m_options_titles_option_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_restaurants" DROP CONSTRAINT "m_restaurants_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_restaurants_categories" DROP CONSTRAINT "m_restaurants_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_restaurants_categories" DROP CONSTRAINT "m_restaurants_categories_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_restaurants_subtitles" DROP CONSTRAINT "m_restaurants_subtitles_restautant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_restaurants_titles" DROP CONSTRAINT "m_restaurants_titles_restautant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_subscriptions" DROP CONSTRAINT "m_subscriptions_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_subscriptions" DROP CONSTRAINT "m_subscriptions_price_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_tags" DROP CONSTRAINT "m_tags_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."m_users" DROP CONSTRAINT "m_users_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."payment_methods" DROP CONSTRAINT "payment_methods_companies_id_fk";

-- DropForeignKey
ALTER TABLE "public"."tables" DROP CONSTRAINT "tables_companies_id_fk";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_companies_id_fk";

-- AlterTable
ALTER TABLE "public"."Dish" ADD COLUMN     "categoryId" UUID,
ADD COLUMN     "restaurantId" UUID NOT NULL;

-- DropTable
DROP TABLE "public"."categories";

-- DropTable
DROP TABLE "public"."companies";

-- DropTable
DROP TABLE "public"."discounts";

-- DropTable
DROP TABLE "public"."gqm_category";

-- DropTable
DROP TABLE "public"."gqm_item";

-- DropTable
DROP TABLE "public"."gqm_restaurant";

-- DropTable
DROP TABLE "public"."items";

-- DropTable
DROP TABLE "public"."m_all_events";

-- DropTable
DROP TABLE "public"."m_allergens";

-- DropTable
DROP TABLE "public"."m_categories";

-- DropTable
DROP TABLE "public"."m_categories_titles";

-- DropTable
DROP TABLE "public"."m_companies";

-- DropTable
DROP TABLE "public"."m_companies_langs";

-- DropTable
DROP TABLE "public"."m_contacts";

-- DropTable
DROP TABLE "public"."m_events";

-- DropTable
DROP TABLE "public"."m_items";

-- DropTable
DROP TABLE "public"."m_items_categories";

-- DropTable
DROP TABLE "public"."m_items_descriptions";

-- DropTable
DROP TABLE "public"."m_items_restaurants";

-- DropTable
DROP TABLE "public"."m_items_titles";

-- DropTable
DROP TABLE "public"."m_messages";

-- DropTable
DROP TABLE "public"."m_options";

-- DropTable
DROP TABLE "public"."m_options_titles";

-- DropTable
DROP TABLE "public"."m_prices";

-- DropTable
DROP TABLE "public"."m_restaurants";

-- DropTable
DROP TABLE "public"."m_restaurants_categories";

-- DropTable
DROP TABLE "public"."m_restaurants_subtitles";

-- DropTable
DROP TABLE "public"."m_restaurants_titles";

-- DropTable
DROP TABLE "public"."m_subscriptions";

-- DropTable
DROP TABLE "public"."m_tags";

-- DropTable
DROP TABLE "public"."m_translations";

-- DropTable
DROP TABLE "public"."m_users";

-- DropTable
DROP TABLE "public"."migrations";

-- DropTable
DROP TABLE "public"."o";

-- DropTable
DROP TABLE "public"."payment_methods";

-- DropTable
DROP TABLE "public"."rates";

-- DropTable
DROP TABLE "public"."tables";

-- DropTable
DROP TABLE "public"."users";

-- DropEnum
DROP TYPE "public"."MAllergenType";

-- DropEnum
DROP TYPE "public"."MCategoryStatus";

-- DropEnum
DROP TYPE "public"."MCompanyLangType";

-- DropEnum
DROP TYPE "public"."MCompanyStatus";

-- DropEnum
DROP TYPE "public"."MContactType";

-- DropEnum
DROP TYPE "public"."MEventType";

-- DropEnum
DROP TYPE "public"."MItemStatus";

-- DropEnum
DROP TYPE "public"."MOptionStatus";

-- DropEnum
DROP TYPE "public"."MRestaurantStatus";

-- DropEnum
DROP TYPE "public"."MSubscriptionStatus";

-- DropEnum
DROP TYPE "public"."MSubscriptionType";

-- DropEnum
DROP TYPE "public"."MUserRole";

-- CreateTable
CREATE TABLE "public"."Restaurant" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(160),
    "name" VARCHAR(200) NOT NULL,
    "defaultLocale" VARCHAR(10) NOT NULL DEFAULT 'en',
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" UUID NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "slug" VARCHAR(160),
    "sortIndex" INTEGER NOT NULL DEFAULT 0,
    "restaurantId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "public"."Restaurant"("slug");

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dish" ADD CONSTRAINT "Dish_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dish" ADD CONSTRAINT "Dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
