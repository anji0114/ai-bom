-- CreateEnum
CREATE TYPE "public"."Sentiment" AS ENUM ('positive', 'neutral', 'negative');

-- CreateTable
CREATE TABLE "public"."customer_feedback" (
    "id" SERIAL NOT NULL,
    "source" TEXT,
    "customerIdentifier" TEXT,
    "content" TEXT NOT NULL,
    "autoCategories" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_analysis" (
    "id" SERIAL NOT NULL,
    "summary" TEXT,
    "sentiment" "public"."Sentiment",
    "categories" JSONB,
    "insights" TEXT,
    "impact" TEXT,
    "priority" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."feedback_analysis" (
    "feedbackId" INTEGER NOT NULL,
    "analysisId" INTEGER NOT NULL,

    CONSTRAINT "feedback_analysis_pkey" PRIMARY KEY ("feedbackId","analysisId")
);

-- AddForeignKey
ALTER TABLE "public"."feedback_analysis" ADD CONSTRAINT "feedback_analysis_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "public"."customer_feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."feedback_analysis" ADD CONSTRAINT "feedback_analysis_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "public"."ai_analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
