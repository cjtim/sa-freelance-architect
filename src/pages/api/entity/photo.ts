import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Photo {
  constructor(job: Partial<Photo>) {
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
