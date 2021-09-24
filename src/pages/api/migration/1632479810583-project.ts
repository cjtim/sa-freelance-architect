import { MigrationInterface, QueryRunner } from 'typeorm'

export class project1632479810583 implements MigrationInterface {
  name = 'project1632479810583'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lineUid" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP COLUMN "lineUid"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD "projectIdId" integer',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD CONSTRAINT "FK_35130da55547714470b3ee7a36d" FOREIGN KEY ("projectIdId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP CONSTRAINT "FK_35130da55547714470b3ee7a36d"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP COLUMN "projectIdId"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP COLUMN "updatedAt"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP COLUMN "createdAt"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD "lineUid" character varying NOT NULL',
    )
    await queryRunner.query('DROP TABLE "projects"')
  }
}
