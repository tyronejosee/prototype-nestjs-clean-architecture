import { MigrationInterface, QueryRunner } from "typeorm";

export class InitCatalog1757538706015 implements MigrationInterface {
  name = "InitCatalog1757538706015";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "catalog_category" ("id" uuid NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_93d2edd351b5bc60abb8bbc7301" UNIQUE ("name"), CONSTRAINT "PK_0c115506ec2e3eed29d14b25de0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "catalog_product" ("id" uuid NOT NULL, "name" character varying(255) NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "currency" character varying(3) NOT NULL, "categoryId" uuid NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5f20fd1c8a63171fe21e5dbd8a8" UNIQUE ("name"), CONSTRAINT "PK_95f45f9c8a51980c2eb98d4532e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eb200d5d86f49328fd17cc8b29" ON "catalog_product" ("name", "categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "catalog_product" ADD CONSTRAINT "FK_596c4a1d44cd6d30e3e5286c0a5" FOREIGN KEY ("categoryId") REFERENCES "catalog_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "catalog_product" DROP CONSTRAINT "FK_596c4a1d44cd6d30e3e5286c0a5"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_eb200d5d86f49328fd17cc8b29"`);
    await queryRunner.query(`DROP TABLE "catalog_product"`);
    await queryRunner.query(`DROP TABLE "catalog_category"`);
  }
}
