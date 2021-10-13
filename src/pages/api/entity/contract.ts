import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { Project } from './project'

@Entity()
export class Contract {
  constructor(job: NewRow<Contract>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly contract_id!: number

  @Column()
  estimated_when!: Date

  @Column()
  compensation!: number

  @Column()
  started_when!: Date

  @Column({ nullable: true })
  installment?: number

  // FK
  @ManyToOne(() => Project, (project) => project.project_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  projects?: Project[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
