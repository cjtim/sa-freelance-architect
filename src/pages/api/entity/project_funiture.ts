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
import { Furniture } from './furnitures'
import { Project } from './project'

@Entity()
export class ProjectFurniture {
  constructor(job: NewRow<ProjectFurniture>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly project_furniture_id!: number

  // FK
  @ManyToOne(() => Project, (project) => project.project_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Project

  // FK
  @ManyToOne(() => Furniture, (furniture) => furniture.furniture_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'furniture_id' })
  furniture!: Furniture

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
