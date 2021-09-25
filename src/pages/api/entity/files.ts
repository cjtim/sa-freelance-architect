import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Project } from './project'

@Entity()
export class Files {
  constructor(job: Files) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  name!: string

  @Column()
  url!: string

  @ManyToOne(() => Project, (project) => project.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  project!: number

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
