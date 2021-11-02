import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DeliverTask } from '.'
import { DefaultColumns } from './_default'

@Entity()
export class Receipt extends DefaultColumns {
  constructor(job: Partial<Receipt>) {
    super()
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly receipt_id?: number

  @Column()
  amount!: number

  @Column()
  receipt_date!: Date

  // TODO: nullable is just in case
  @Column({ nullable: true })
  receipt_img_url?: string

  // FK - task_id
  @ManyToOne(() => DeliverTask, (deliver) => deliver.receipts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'task_id' })
  deliverTask!: Partial<DeliverTask>
}
