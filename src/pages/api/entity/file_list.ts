import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { Project } from '.'

@Entity()
export class FileList {
  constructor(job: NewRow<FileList>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly file_id!: number

  @Column()
  name!: string

  @Column()
  url!: string

  @Column({ nullable: true })
  notes?: string

  // FK
  @ManyToOne('Project', 'FileList', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Project

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
