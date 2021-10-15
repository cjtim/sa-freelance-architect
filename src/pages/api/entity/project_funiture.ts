import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { Project, Furniture } from '.'

@Entity()
export class ProjectFurniture {
  constructor(job: NewRow<ProjectFurniture>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly project_furniture_id!: number

  // FK
  @ManyToOne('Project', 'ProjectFurniture', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Partial<Project>

  // FK
  @ManyToOne(() => Furniture, (furniture) => furniture.projectFurniture, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'furniture_id' })
  furniture!: Partial<Furniture>

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
