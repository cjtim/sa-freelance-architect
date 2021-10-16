import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { Project } from '.'
import { DefaultColumns } from './_default'

@Entity()
export class Architect extends DefaultColumns {
  constructor(fur: NewRow<Architect>) {
    super()
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

  @OneToMany(() => Project, (project) => project.architect, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  projects?: Project[]
}
