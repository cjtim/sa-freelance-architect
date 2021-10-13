import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Architect, Contract, Customer, FileList, ProjectFurniture } from '.'

@Entity()
export class Project {
  constructor(job: Partial<Project>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly project_id?: number

  @Column()
  name!: string

  @Column()
  estimated_when!: Date

  @Column()
  started_when!: Date

  @Column()
  status!: 'NOT SIGNING' | 'DONE'

  @OneToMany('FileList', 'Project', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  fileLists?: FileList[]

  @OneToOne('Contract', 'Project', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contract?: Contract

  @OneToMany('ProjectFurniture', 'Project', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  projectFurniture?: ProjectFurniture[]

  // FK - not null
  @ManyToOne('Customer', 'Project', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer?: Partial<Customer>

  // FK - not null
  @ManyToOne('Architect', 'Project', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'architect_id' })
  architect?: Partial<Architect>

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at?: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at?: Date
}
