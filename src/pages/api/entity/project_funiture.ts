import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Project, Furniture } from '.'
import { DefaultColumns } from './_default'

@Entity()
export class ProjectFurniture extends DefaultColumns {
  constructor(job: Partial<ProjectFurniture>) {
    super()
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly project_furniture_id?: number

  // FK - project_id
  @ManyToOne('Project', 'ProjectFurniture', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Partial<Project>

  // FK - furniture_id
  @ManyToOne(() => Furniture, (furniture) => furniture.projectFurniture, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'furniture_id' })
  furniture!: Partial<Furniture>
}
