import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { Receipt, Project } from '.'

@Entity()
export class DeliverTask {
  constructor(job: NewRow<DeliverTask>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly task_id!: number

  @Column({ nullable: true })
  note?: string

  @Column()
  due_date!: Date

  @Column({ nullable: true })
  actual_date?: Date

  // FK - not null
  @ManyToOne(() => Project, (project) => project.deliverTasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Partial<Project>

  @OneToMany('Receipt', 'DeliverTask', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'receipt_id' })
  receipts?: Receipt[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
