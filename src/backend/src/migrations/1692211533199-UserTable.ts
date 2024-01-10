import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1692211533199 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "guid", type: "text", isNullable: true },
          { name: "username", type: "text", isNullable: true },
          { name: "email", type: "text", isNullable: true },
          { name: "firstName", type: "text", isNullable: true },
          { name: "lastName", type: "text", isNullable: true },
          { name: "displayName", type: "text", isNullable: true },
          { name: "roles", type: "text", isNullable: true, isArray: true },
          {
            name: "createdOn",
            type: "timestamp",
            isNullable: true,
            default: "NOW()",
          },
          { name: "lastUpdated", type: "timestamp", isNullable: true, default: "NOW()" },
          { name: "lastLogin", type: "timestamp", isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
