import { MigrationInterface, QueryRunner } from 'typeorm'

export class first1632474660288 implements MigrationInterface {
  name = 'first1632474660288'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "lineUid" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "photo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "filename" character varying NOT NULL, "views" integer NOT NULL, "isPublished" boolean NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "photo"')
    await queryRunner.query('DROP TABLE "files"')
  }
}
