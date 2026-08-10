-- GitHub authentication has been removed from the application.
-- Stop rather than silently relabeling existing GitHub merchant accounts.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "Merchant"
    WHERE "auth_type"::text = 'Github'
  ) THEN
    RAISE EXCEPTION
      'Cannot remove AuthType.Github while GitHub-authenticated merchants exist; migrate those accounts first';
  END IF;
END $$;

ALTER TYPE "AuthType" RENAME TO "AuthType_old";
CREATE TYPE "AuthType" AS ENUM ('Google');

ALTER TABLE "Merchant"
  ALTER COLUMN "auth_type" TYPE "AuthType"
  USING ("auth_type"::text::"AuthType");

DROP TYPE "AuthType_old";
