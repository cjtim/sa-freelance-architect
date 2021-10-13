import {
  Column,
  CreateDateColumn,
  Entity,
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

  @OneToMany('DeliverTask', 'Receipt', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  deliverTask!: DeliverTask

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
