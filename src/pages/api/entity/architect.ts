import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { Project } from './project'

@Entity()
export class Architect {
  constructor(fur: NewRow<Architect>) {
    Object.assign(this, fur)
  }

  @PrimaryGeneratedColumn()
  readonly architect_id!: number

  @Column()
  name!: string

  @Column({ length: '10' })
  phone!: string

  @Column()
  lineUid!: string

  @OneToMany(() => Project, (project) => project.project_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  projects?: Project[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
