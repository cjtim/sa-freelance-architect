import { MigrationInterface, QueryRunner } from 'typeorm'

export class project1632501477040 implements MigrationInterface {
  name = 'project1632501477040'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP CONSTRAINT "FK_35130da55547714470b3ee7a36d"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" RENAME COLUMN "projectIdId" TO "projectId"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD CONSTRAINT "FK_15a7c8a5a676b9a0e0acd8209a5" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."files" DROP CONSTRAINT "FK_15a7c8a5a676b9a0e0acd8209a5"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" RENAME COLUMN "projectId" TO "projectIdId"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."files" ADD CONSTRAINT "FK_35130da55547714470b3ee7a36d" FOREIGN KEY ("projectIdId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }
}
