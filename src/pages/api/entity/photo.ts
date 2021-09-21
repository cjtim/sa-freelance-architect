import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Photo extends BaseEntity {
  constructor(job: Partial<Photo>) {
    super()
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  filename!: string

  @Column()
  views!: number

  @Column()
  isPublished!: boolean
}
