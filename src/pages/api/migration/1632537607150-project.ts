import { MigrationInterface, QueryRunner } from 'typeorm'

export class project1632537607150 implements MigrationInterface {
  name = 'project1632537607150'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lineUid" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "projectId" integer NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'ALTER TABLE "files" ADD CONSTRAINT "FK_15a7c8a5a676b9a0e0acd8209a5" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "files" DROP CONSTRAINT "FK_15a7c8a5a676b9a0e0acd8209a5"',
    )
    await queryRunner.query('DROP TABLE "files"')
    await queryRunner.query('DROP TABLE "project"')
  }
}
