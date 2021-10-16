import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {
  Architect,
  Contract,
  Customer,
  DeliverTask,
  FileList,
  ProjectFurniture,
} from '.'

@Entity()
export class Project {
  constructor(job: Partial<Project>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly project_id!: number

  @Column()
  name!: string

  @Column()
  estimated_when!: Date

  @Column()
  started_when!: Date

  @Column()
  status!: 'NOT SIGNING' | 'DONE'

  @OneToMany(() => FileList, (i) => i.project, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  fileLists?: FileList[]

  @OneToMany(() => DeliverTask, (i) => i.project, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  deliverTasks?: DeliverTask[]

  @OneToOne(() => Contract, (i) => i.project, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contract?: Contract

  @OneToMany(() => ProjectFurniture, (i) => i.project, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  projectFurniture?: ProjectFurniture[]

  // FK - not null
  @ManyToOne(() => Customer, (customer) => customer.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer?: Partial<Customer>

  // FK - not null
  @ManyToOne(() => Architect, (architect) => architect.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'architect_id' })
  architect?: Partial<Architect>

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
