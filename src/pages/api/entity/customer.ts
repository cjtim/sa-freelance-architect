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
export class Customer {
  constructor(customer: NewRow<Customer>) {
    Object.assign(this, customer)
  }

  @PrimaryGeneratedColumn()
  readonly customer_id?: number

  @Column()
  name!: string

  @Column({ length: '10' })
  phone!: string

  @OneToMany(() => Project, (project) => project.customer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  projects?: Project[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at?: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at?: Date
}
