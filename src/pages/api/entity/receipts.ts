import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { DeliverTask } from './deliver_task'

@Entity()
export class Receipt {
  constructor(job: NewRow<Receipt>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly receipt_id!: number

  @Column()
  amount!: number

  @Column()
  receipt_date!: Date

  // TODO: nullable is just in case
  @Column({ nullable: true })
  receipt_img_url?: Date

  @OneToMany(() => DeliverTask, (deliverTask) => deliverTask.task_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  deliverTask!: DeliverTask

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
