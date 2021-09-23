import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Files extends BaseEntity {
  constructor(job: Partial<File>) {
    super()
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  name!: string

  @Column()
  url!: string

  @Column()
  lineUid!: string
}
