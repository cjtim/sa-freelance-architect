import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Files {
  constructor(job: Partial<File>) {
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
