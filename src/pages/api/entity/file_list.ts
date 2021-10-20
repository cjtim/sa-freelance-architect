import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Project } from '.'
import { DefaultColumns } from './_default'

@Entity()
export class FileList extends DefaultColumns {
  constructor(job: Partial<FileList>) {
    super()
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly file_id?: number

  @Column()
  name!: string

  @Column()
  url!: string

  @Column({ nullable: true })
  notes?: string

  // FK
  @ManyToOne(() => Project, (project) => project.fileLists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Partial<Project>
}
