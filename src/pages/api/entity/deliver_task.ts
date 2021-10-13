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
import { Project } from './project'
import { Receipt } from './receipts'

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
  @ManyToOne(() => Project, (project) => project.project_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Project

  @OneToMany(() => Receipt, (receipt) => receipt.receipt_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  receipts?: Receipt[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
