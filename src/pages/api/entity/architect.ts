import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { Project } from '.'

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

  @OneToMany(() => Project, (project) => project.architect, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  projects?: Project[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
