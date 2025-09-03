-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "token" VARCHAR(32) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VerificationToken_email_idx" ON "public"."VerificationToken"("email");
