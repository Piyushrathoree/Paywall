-- Merchant workspace entities: payment links, customers, payments, and settlements.
CREATE TYPE "PaymentLinkStatus" AS ENUM ('Active', 'Archived');
CREATE TYPE "MerchantPaymentStatus" AS ENUM ('Pending', 'Completed', 'Failed');
CREATE TYPE "SettlementStatus" AS ENUM ('Pending', 'Processing', 'Completed', 'Failed');

CREATE TABLE "PaymentLink" (
  "id" SERIAL NOT NULL,
  "merchantId" INTEGER NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "amount" INTEGER NOT NULL,
  "status" "PaymentLinkStatus" NOT NULL DEFAULT 'Active',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PaymentLink_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MerchantCustomer" (
  "id" SERIAL NOT NULL,
  "merchantId" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MerchantCustomer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MerchantPayment" (
  "id" SERIAL NOT NULL,
  "merchantId" INTEGER NOT NULL,
  "paymentLinkId" INTEGER,
  "customerId" INTEGER,
  "reference" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "status" "MerchantPaymentStatus" NOT NULL DEFAULT 'Pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "paidAt" TIMESTAMP(3),
  CONSTRAINT "MerchantPayment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Settlement" (
  "id" SERIAL NOT NULL,
  "merchantId" INTEGER NOT NULL,
  "reference" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "status" "SettlementStatus" NOT NULL DEFAULT 'Pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "settledAt" TIMESTAMP(3),
  CONSTRAINT "Settlement_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PaymentLink_slug_key" ON "PaymentLink"("slug");
CREATE UNIQUE INDEX "MerchantPayment_reference_key" ON "MerchantPayment"("reference");
CREATE UNIQUE INDEX "Settlement_reference_key" ON "Settlement"("reference");
CREATE INDEX "PaymentLink_merchantId_createdAt_idx" ON "PaymentLink"("merchantId", "createdAt");
CREATE INDEX "MerchantCustomer_merchantId_createdAt_idx" ON "MerchantCustomer"("merchantId", "createdAt");
CREATE INDEX "MerchantPayment_merchantId_createdAt_idx" ON "MerchantPayment"("merchantId", "createdAt");
CREATE INDEX "MerchantPayment_paymentLinkId_idx" ON "MerchantPayment"("paymentLinkId");
CREATE INDEX "Settlement_merchantId_createdAt_idx" ON "Settlement"("merchantId", "createdAt");

ALTER TABLE "PaymentLink" ADD CONSTRAINT "PaymentLink_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "MerchantCustomer" ADD CONSTRAINT "MerchantCustomer_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "MerchantPayment" ADD CONSTRAINT "MerchantPayment_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "MerchantPayment" ADD CONSTRAINT "MerchantPayment_paymentLinkId_fkey" FOREIGN KEY ("paymentLinkId") REFERENCES "PaymentLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MerchantPayment" ADD CONSTRAINT "MerchantPayment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "MerchantCustomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
