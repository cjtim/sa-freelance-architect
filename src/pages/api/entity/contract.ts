import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Project } from '.'
import { DefaultColumns } from './_default'

@Entity()
export class Contract extends DefaultColumns {
  constructor(job: Partial<Contract>) {
    super()
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly contract_id?: number

  @Column()
  estimated_when!: Date

  @Column()
  compensation!: number

  @Column()
  started_when!: Date

  @Column({ nullable: true })
  installment?: number

  // FK
  @OneToOne(() => Project, (project) => project.contract, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project!: Partial<Project>
}
