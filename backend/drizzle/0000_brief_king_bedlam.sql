CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"nit" varchar(9) NOT NULL,
	"email" varchar NOT NULL,
	"address" varchar NOT NULL,
	"phone" varchar(30) NOT NULL,
	CONSTRAINT "companies_nit_unique" UNIQUE("nit"),
	CONSTRAINT "companies_email_unique" UNIQUE("email"),
	CONSTRAINT "companies_phone_unique" UNIQUE("phone")
);
