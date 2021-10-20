import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Project } from '.'
import { DefaultColumns } from './_default'

@Entity()
export class Customer extends DefaultColumns {
  constructor(customer: Partial<Customer>) {
    super()
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
}
