import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Receipt, Project } from '.'
import { DeliveryState } from '../interface/state'
import { DefaultColumns } from './_default'

@Entity()
export class DeliverTask extends DefaultColumns {
  constructor(job: Partial<DeliverTask>) {
    super()
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly task_id?: number

  @Column({ nullable: true })
  note?: string

  @Column()
  due_date!: Date

  @Column({ nullable: true })
  actual_date?: Date

  @Column({
    enum: DeliveryState,
    enumName: 'deliver_task_status_enum',
    default: DeliveryState.WAIT_FOR_REVIEW,
  })
  status?: DeliveryState

  // FK - project_id
  @ManyToOne(() => Project, (project) => project.deliverTasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Partial<Project>

  // Relation
  @OneToMany('Receipt', 'DeliverTask', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'receipt_id' })
  receipts?: Receipt[]
}
