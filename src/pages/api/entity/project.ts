import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { Architect } from './architect'
import { Contract } from './contract'
import { Customer } from './customer'
import { FileList } from './file_list'
import { Furniture } from './furnitures'
import { ProjectFurniture } from './project_funiture'

@Entity()
export class Project {
  constructor(job: NewRow<Project>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly project_id!: number

  @Column()
  name!: string

  @Column()
  estimated_when!: Date

  @Column()
  started_when!: Date

  @Column()
  status!: 'NOT SIGNING' | 'DONE'

  @Column()
  lineUid!: string

  @OneToMany(() => FileList, (FileList) => FileList.file_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  fileLists?: FileList[]

  @OneToMany(() => Contract, (Contract) => Contract.contract_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contracts?: Contract[]

  @OneToMany(
    () => ProjectFurniture,
    (ProjectFurniture) => ProjectFurniture.project_furniture_id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  projectFurniture?: ProjectFurniture[]

  // FK - not null
  @ManyToOne(() => Customer, (customer) => customer.customer_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer

  // FK - not null
  @ManyToOne(() => Architect, (ar) => ar.architect_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'architect_id' })
  architect!: Architect

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
