import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import {
  Architect,
  Contract,
  Customer,
  DeliverTask,
  FileList,
  ProjectFurniture,
} from '.'
import { ProjectState } from '../interface/state'
import { DefaultColumns } from './_default'

@Entity()
export class Project extends DefaultColumns {
  constructor(job: Partial<Project>) {
    super()
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly project_id?: number

  @Column()
  name!: string

  @Column()
  estimated_when!: Date

  @Column()
  started_when!: Date

  @Column({
    enum: ProjectState,
    enumName: 'project_status_enum',
    default: ProjectState.NEW,
  })
  status?: ProjectState

  /**
   * FK
   * - customer_id
   * - architect_id
   */
  // FK - customer_id
  @ManyToOne(() => Customer, (customer) => customer.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer?: Partial<Customer>

  // FK - architect_id
  @ManyToOne(() => Architect, (architect) => architect.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'architect_id' })
  architect?: Partial<Architect>

  /**
   * Relations
   */
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
}
