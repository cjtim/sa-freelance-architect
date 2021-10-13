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
export class Customer {
  constructor(customer: NewRow<Customer>) {
    Object.assign(this, customer)
  }

  @PrimaryGeneratedColumn()
  readonly customer_id!: number

  @Column()
  name!: string

  @Column({ length: '10' })
  phone!: string

  @OneToMany(() => Project, (project) => project.project_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  projects?: Project[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
