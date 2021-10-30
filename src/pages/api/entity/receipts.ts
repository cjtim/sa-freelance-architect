import {
  Column,
  Entity,
  JoinColumn,
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
  receipt_img_url?: Date

  // FK - task_id
  @OneToMany(() => DeliverTask, (deliver) => deliver.receipts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'task_id' })
  deliverTask!: Partial<DeliverTask>
}
