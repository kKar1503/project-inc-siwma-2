-- CreateEnum
CREATE TYPE "datatype" AS ENUM ('string', 'number', 'boolean');

-- CreateEnum
CREATE TYPE "listingtype" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "notificationtype" AS ENUM ('TAB1', 'TAB2');

-- CreateEnum
CREATE TYPE "parametertype" AS ENUM ('WEIGHT', 'DIMENSION', 'TWO CHOICES', 'MANY CHOICES', 'OPEN ENDED');

-- CreateEnum
CREATE TYPE "usercontacts" AS ENUM ('whatsapp', 'phone', 'telegram', 'facebook', 'email');

-- CreateTable
CREATE TABLE "advertisements" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "category_id" INT4 NOT NULL,
    "image" STRING NOT NULL,
    "description" STRING NOT NULL,
    "link" STRING NOT NULL DEFAULT '',
    "active" BOOL NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advertisements_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_parameters" (
    "category_id" INT4 NOT NULL,
    "parameter_id" INT4 NOT NULL,
    "required" BOOL NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_parameters_pk" PRIMARY KEY ("category_id","parameter_id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "image" STRING NOT NULL,
    "cross_section_image" STRING NOT NULL,
    "active" BOOL NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clicks" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "advertisement_id" INT4 NOT NULL,
    "user_id" UUID NOT NULL,
    "link" BOOL NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clicks_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "bio" STRING DEFAULT '',
    "website" STRING DEFAULT '',
    "logo" STRING DEFAULT '',
    "visibility" BOOL NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies_comments" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "company_id" INT4 NOT NULL,
    "comments" STRING NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_comments_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invite" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expiry" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" INT4 NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invite_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "price" DECIMAL NOT NULL DEFAULT 0,
    "unit_price" BOOL NOT NULL DEFAULT false,
    "negotiable" BOOL NOT NULL DEFAULT true,
    "open" BOOL NOT NULL DEFAULT true,
    "visibility" BOOL NOT NULL DEFAULT true,
    "active" BOOL NOT NULL DEFAULT true,
    "category_id" INT4 NOT NULL,
    "type" "listingtype" NOT NULL,
    "owner" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing_bookmarks" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "user_id" UUID NOT NULL,
    "listing_id" INT4 NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_bookmarks_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing_images" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "listing_id" INT4 NOT NULL,
    "image" STRING NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_images_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings_parameters_value" (
    "listing_id" INT4 NOT NULL,
    "parameter_id" INT4 NOT NULL,
    "value" STRING NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listings_parameters_value_pk" PRIMARY KEY ("listing_id","parameter_id")
);

-- CreateTable
CREATE TABLE "notification_settings" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "user_id" UUID NOT NULL,
    "type" "notificationtype" NOT NULL,

    CONSTRAINT "notification_settings_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameter_choices" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "choice" STRING[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parameter_choices_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_bookmarks" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "user_id" UUID NOT NULL,
    "target_user" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_bookmarks_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" STRING NOT NULL,
    "full_name" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "profile_picture" STRING,
    "password" STRING NOT NULL,
    "contact" "usercontacts" NOT NULL,
    "permissions" INT4 NOT NULL DEFAULT 0,
    "enabled" BOOL NOT NULL DEFAULT true,
    "company_id" INT4 NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_comments" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "user_id" UUID NOT NULL,
    "comments" STRING NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_comments_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies_bookmarks" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "user_id" UUID NOT NULL,
    "company_id" INT4 NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_bookmarks_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameter" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "type" "parametertype" NOT NULL,
    "datatype" "datatype" NOT NULL,
    "name" STRING NOT NULL,
    "display_name" STRING NOT NULL,
    "active" BOOL NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parameter_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_parameters" ADD CONSTRAINT "categories_parameters_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_parameters" ADD CONSTRAINT "categories_parameters_fk_1" FOREIGN KEY ("parameter_id") REFERENCES "parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_fk" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_fk_1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_comments" ADD CONSTRAINT "companies_comments_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invite" ADD CONSTRAINT "invite_fk" FOREIGN KEY ("id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "listing_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "listing_fk_1" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_bookmarks" ADD CONSTRAINT "listing_bookmarks_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_bookmarks" ADD CONSTRAINT "listing_bookmarks_fk_1" FOREIGN KEY ("listing_id") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_fk" FOREIGN KEY ("listing_id") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings_parameters_value" ADD CONSTRAINT "listings_parameters_value_fk" FOREIGN KEY ("listing_id") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings_parameters_value" ADD CONSTRAINT "listings_parameters_value_fk_1" FOREIGN KEY ("parameter_id") REFERENCES "parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_settings" ADD CONSTRAINT "notification_settings_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bookmarks" ADD CONSTRAINT "user_bookmarks_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_comments" ADD CONSTRAINT "users_comments_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_bookmarks" ADD CONSTRAINT "companies_bookmarks_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
