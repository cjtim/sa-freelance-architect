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
import { DeliverTask } from '.'

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

  // FK - not null
  @OneToMany(() => DeliverTask, (deliver) => deliver.receipts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'task_id' })
  deliverTask!: Partial<DeliverTask>

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
