import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialization1706636437554 implements MigrationInterface {
  name = 'Initialization1706636437554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdated" TIMESTAMP NOT NULL DEFAULT now(), "guid" text, "username" text, "email" text, "firstName" text, "lastName" text, "displayName" text, "roles" text array, "lastLogin" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
