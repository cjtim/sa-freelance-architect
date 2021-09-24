import { MigrationInterface, QueryRunner } from 'typeorm'

export class project1632501939233 implements MigrationInterface {
  name = 'project1632501939233'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP CONSTRAINT "FK_15a7c8a5a676b9a0e0acd8209a5"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" RENAME COLUMN "projectId" TO "projectsId"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ALTER COLUMN "projectsId" SET NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD CONSTRAINT "FK_23ddd66f963846b7f786124110e" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP CONSTRAINT "FK_23ddd66f963846b7f786124110e"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ALTER COLUMN "projectsId" DROP NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" RENAME COLUMN "projectsId" TO "projectId"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD CONSTRAINT "FK_15a7c8a5a676b9a0e0acd8209a5" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }
}
