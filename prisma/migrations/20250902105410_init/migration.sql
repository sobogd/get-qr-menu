-- CreateEnum
CREATE TYPE "public"."MAllergenType" AS ENUM ('GLUTEN', 'MILK', 'EGGS', 'NUTS', 'PEANUTS', 'SOYBEANS', 'FISH', 'CRUSTACEANS', 'MOLLUSCS', 'CELERY', 'LUPIN', 'SESAME', 'MUSTARD', 'SULPHITES');

-- CreateEnum
CREATE TYPE "public"."MCategoryStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DISABLED');

-- CreateEnum
CREATE TYPE "public"."MCompanyLangType" AS ENUM ('GENERAL', 'ADDITIONAL');

-- CreateEnum
CREATE TYPE "public"."MCompanyStatus" AS ENUM ('ACTIVE', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "public"."MContactType" AS ENUM ('PHONE', 'ADDRESS', 'FACEBOOK', 'WEBSITE', 'INSTAGRAM', 'WHATSAPP', 'TELEGRAM', 'GOOGLE_MAPS_COORDS', 'GOOGLE_MAPS_LINK', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."MEventType" AS ENUM ('QR_SCAN_MAIN', 'QR_SCAN_TAG', 'PAGE_MAIN', 'PAGE_CONTACTS', 'PAGE_LANGUAGES', 'PAGE_LIKES', 'PAGE_MENU', 'PAGE_DETAILS', 'PAGE_FILTERS', 'LANGUAGE_CHANGE', 'LIKE_DISH_LIST', 'LIKE_DISH_DETAILS', 'APPLY_FILTERS');

-- CreateEnum
CREATE TYPE "public"."MItemStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DISABLED');

-- CreateEnum
CREATE TYPE "public"."MOptionStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DISABLED');

-- CreateEnum
CREATE TYPE "public"."MRestaurantStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."MSubscriptionStatus" AS ENUM ('DISABLED', 'PENDING', 'ACTIVE');

-- CreateEnum
CREATE TYPE "public"."MSubscriptionType" AS ENUM ('FREE', 'PRO', 'ULTRA');

-- CreateEnum
CREATE TYPE "public"."MUserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."AllergenCode" AS ENUM ('gluten', 'lactose', 'nuts', 'soy', 'egg', 'fish', 'shellfish', 'sesame', 'mustard', 'celery', 'lupin', 'sulphites');

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "company_id" INTEGER,
    "sort" INTEGER,
    "translations" JSONB,
    "status" VARCHAR(100) DEFAULT 'active',

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."companies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "login" TEXT,
    "utc_diff" INTEGER,
    "currency_symbol" VARCHAR(10),
    "timezone" VARCHAR(100),
    "email" VARCHAR(200),
    "lang" VARCHAR(20),
    "tin" VARCHAR(10),
    "balance" DECIMAL,
    "status" VARCHAR(20),
    "rate_id" INTEGER,
    "created" TIMESTAMP(6) DEFAULT timezone('utc'::text, now()),
    "next_payment" TIMESTAMP(6) DEFAULT timezone('utc'::text, (now() + '1 mon'::interval)),
    "langs" JSON,
    "phone" VARCHAR(100),
    "instagram" VARCHAR(100),
    "google_maps_link" VARCHAR(100),
    "address" VARCHAR(100),
    "pm" JSONB,
    "site" VARCHAR,
    "show_public_header" BOOLEAN NOT NULL DEFAULT true,
    "google_map_coords" VARCHAR,
    "otp" TEXT,

    CONSTRAINT "companies_pk2" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."discounts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "item_ids" JSONB,
    "company_id" INTEGER,
    "percent" INTEGER,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."items" (
    "id" SERIAL NOT NULL,
    "company" INTEGER NOT NULL,
    "c" INTEGER NOT NULL,
    "s" INTEGER NOT NULL,
    "n" VARCHAR(100) NOT NULL,
    "p" DECIMAL NOT NULL,
    "d" TEXT,
    "i" TEXT,
    "a" BOOLEAN NOT NULL,
    "h" BOOLEAN NOT NULL,
    "v" JSONB,
    "o" JSONB,
    "f" VARCHAR(150),
    "t" JSONB,
    "vt" JSONB,
    "ot" JSONB,
    "al" JSON,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_all_events" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT timezone('utc'::text, now()),
    "event" TEXT NOT NULL,
    "external_id" TEXT,
    "country" TEXT,

    CONSTRAINT "m_all_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_allergens" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "type" "public"."MAllergenType" NOT NULL,

    CONSTRAINT "m_allergens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_categories" (
    "id" SERIAL NOT NULL,
    "sort" DECIMAL(65,30) NOT NULL,
    "status" "public"."MCategoryStatus" NOT NULL DEFAULT 'ACTIVE',
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "m_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_categories_titles" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "m_categories_titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_companies" (
    "id" SERIAL NOT NULL,
    "status" "public"."MCompanyStatus" NOT NULL DEFAULT 'ACTIVE',
    "customer_id" TEXT,

    CONSTRAINT "m_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_companies_langs" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "type" "public"."MCompanyLangType" NOT NULL DEFAULT 'GENERAL',
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "m_companies_langs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_contacts" (
    "id" SERIAL NOT NULL,
    "type" "public"."MContactType" NOT NULL,
    "value" TEXT NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "m_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_events" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "public"."MEventType" NOT NULL,
    "data" JSONB,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "m_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_items" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "image" TEXT NOT NULL,
    "sort" DECIMAL(65,30) NOT NULL,
    "status" "public"."MItemStatus" NOT NULL DEFAULT 'ACTIVE',
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "m_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_items_categories" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "m_items_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_items_descriptions" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "m_items_descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_items_restaurants" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "m_items_restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_items_titles" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "m_items_titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_messages" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_customer" BOOLEAN NOT NULL,
    "message" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "m_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_options" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "required" BOOLEAN NOT NULL,
    "status" "public"."MOptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "m_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_options_titles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "option_id" INTEGER NOT NULL,

    CONSTRAINT "m_options_titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_prices" (
    "id" SERIAL NOT NULL,
    "price_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" "public"."MSubscriptionType" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "m_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_restaurants" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "currency" TEXT,
    "website" TEXT,
    "name" TEXT,
    "status" "public"."MRestaurantStatus" NOT NULL DEFAULT 'ACTIVE',
    "background" TEXT,
    "theme" TEXT,

    CONSTRAINT "m_restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_restaurants_categories" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "m_restaurants_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_restaurants_subtitles" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "restautant_id" INTEGER NOT NULL,

    CONSTRAINT "m_restaurants_subtitles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_restaurants_titles" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "restautant_id" INTEGER NOT NULL,

    CONSTRAINT "m_restaurants_titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_subscriptions" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "type" "public"."MSubscriptionType" NOT NULL DEFAULT 'FREE',
    "price_id" INTEGER NOT NULL,
    "status" "public"."MSubscriptionStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "m_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_tags" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "m_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_translations" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "m_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."MUserRole" NOT NULL DEFAULT 'ADMIN',
    "otp" TEXT,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "m_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."o" (
    "t" INTEGER,
    "c" TEXT,
    "p" JSONB,
    "n" INTEGER,
    "cid" INTEGER,
    "crt" BIGINT,
    "d" DECIMAL,
    "m" VARCHAR(200),
    "f" BIGINT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "o_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "payment_methods_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rates" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "per_month" INTEGER,

    CONSTRAINT "rates_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tables" (
    "id" SERIAL NOT NULL,
    "number" INTEGER,
    "name" VARCHAR(255),
    "x" DECIMAL,
    "y" DECIMAL,
    "company_id" INTEGER,
    "status" VARCHAR(30),
    "for_order" BOOLEAN,
    "w" DECIMAL,
    "type" VARCHAR(30),
    "h" DECIMAL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "status" VARCHAR(30),
    "last_login" TIMESTAMP(6),
    "lang" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gqm_restaurant" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(160),
    "name" VARCHAR(200) NOT NULL,
    "defaultLocale" VARCHAR(10) NOT NULL DEFAULT 'en',
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "gqm_restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gqm_category" (
    "id" UUID NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "slug" VARCHAR(160),
    "sortIndex" INTEGER NOT NULL DEFAULT 0,
    "restaurantId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "gqm_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gqm_item" (
    "id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "priceCents" INTEGER NOT NULL,
    "currency" VARCHAR(8) NOT NULL DEFAULT 'USD',
    "available" BOOLEAN NOT NULL DEFAULT true,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "sortIndex" INTEGER NOT NULL DEFAULT 0,
    "restaurantId" UUID NOT NULL,
    "categoryId" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "gqm_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dish" (
    "id" TEXT NOT NULL,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "photoUrl" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DishTranslation" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "DishTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OptionGroup" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "selection" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "minSelect" INTEGER,
    "maxSelect" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OptionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OptionGroupTranslation" (
    "id" TEXT NOT NULL,
    "optionGroupId" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OptionGroupTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Option" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "priceDelta" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OptionTranslation" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OptionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DishOptionGroup" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "DishOptionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DishTag" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "DishTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DishAllergen" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "code" "public"."AllergenCode" NOT NULL,

    CONSTRAINT "DishAllergen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_pk" ON "public"."companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "gqm_restaurant_slug_key" ON "public"."gqm_restaurant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DishTranslation_dishId_lang_key" ON "public"."DishTranslation"("dishId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "OptionGroupTranslation_optionGroupId_lang_key" ON "public"."OptionGroupTranslation"("optionGroupId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "OptionTranslation_optionId_lang_key" ON "public"."OptionTranslation"("optionId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "DishOptionGroup_dishId_groupId_key" ON "public"."DishOptionGroup"("dishId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "public"."Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DishTag_dishId_tagId_key" ON "public"."DishTag"("dishId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "DishAllergen_dishId_code_key" ON "public"."DishAllergen"("dishId", "code");

-- AddForeignKey
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."companies" ADD CONSTRAINT "companies_rates_id_fk" FOREIGN KEY ("rate_id") REFERENCES "public"."rates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."m_allergens" ADD CONSTRAINT "m_allergens_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."m_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_categories" ADD CONSTRAINT "m_categories_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."m_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_categories_titles" ADD CONSTRAINT "m_categories_titles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."m_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_companies_langs" ADD CONSTRAINT "m_companies_langs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."m_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_contacts" ADD CONSTRAINT "m_contacts_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."m_restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_events" ADD CONSTRAINT "m_events_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."m_restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_items" ADD CONSTRAINT "m_items_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."m_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_items_categories" ADD CONSTRAINT "m_items_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."m_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_items_categories" ADD CONSTRAINT "m_items_categories_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."m_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_items_descriptions" ADD CONSTRAINT "m_items_descriptions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."m_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_items_restaurants" ADD CONSTRAINT "m_items_restaurants_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."m_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_items_restaurants" ADD CONSTRAINT "m_items_restaurants_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."m_restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_items_titles" ADD CONSTRAINT "m_items_titles_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."m_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_messages" ADD CONSTRAINT "m_messages_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."m_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_options" ADD CONSTRAINT "m_options_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."m_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_options_titles" ADD CONSTRAINT "m_options_titles_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "public"."m_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_restaurants" ADD CONSTRAINT "m_restaurants_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."m_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_restaurants_categories" ADD CONSTRAINT "m_restaurants_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."m_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_restaurants_categories" ADD CONSTRAINT "m_restaurants_categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."m_restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_restaurants_subtitles" ADD CONSTRAINT "m_restaurants_subtitles_restautant_id_fkey" FOREIGN KEY ("restautant_id") REFERENCES "public"."m_restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_restaurants_titles" ADD CONSTRAINT "m_restaurants_titles_restautant_id_fkey" FOREIGN KEY ("restautant_id") REFERENCES "public"."m_restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_subscriptions" ADD CONSTRAINT "m_subscriptions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."m_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_subscriptions" ADD CONSTRAINT "m_subscriptions_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "public"."m_prices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_tags" ADD CONSTRAINT "m_tags_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."m_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_users" ADD CONSTRAINT "m_users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."m_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_methods" ADD CONSTRAINT "payment_methods_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tables" ADD CONSTRAINT "tables_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."gqm_category" ADD CONSTRAINT "gqm_category_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."gqm_restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."gqm_item" ADD CONSTRAINT "gqm_item_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."gqm_restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."gqm_item" ADD CONSTRAINT "gqm_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."gqm_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DishTranslation" ADD CONSTRAINT "DishTranslation_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OptionGroupTranslation" ADD CONSTRAINT "OptionGroupTranslation_optionGroupId_fkey" FOREIGN KEY ("optionGroupId") REFERENCES "public"."OptionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Option" ADD CONSTRAINT "Option_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."OptionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OptionTranslation" ADD CONSTRAINT "OptionTranslation_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "public"."Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DishOptionGroup" ADD CONSTRAINT "DishOptionGroup_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DishOptionGroup" ADD CONSTRAINT "DishOptionGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."OptionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DishTag" ADD CONSTRAINT "DishTag_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DishTag" ADD CONSTRAINT "DishTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DishAllergen" ADD CONSTRAINT "DishAllergen_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
