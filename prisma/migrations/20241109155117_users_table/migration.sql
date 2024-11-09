-- CreateTable
CREATE TABLE "users" (
    "use_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "use_name" VARCHAR(100),
    "use_email" VARCHAR(50),
    "use_password" VARCHAR(255),
    "use_token" VARCHAR(255),
    "use_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "use_updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("use_uuid")
);
