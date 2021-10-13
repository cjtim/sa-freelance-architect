import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { NewRow } from '../interface/common'
import { ProjectFurniture } from './project_funiture'

@Entity()
export class Furniture {
  constructor(fur: NewRow<Furniture>) {
    Object.assign(this, fur)
  }

  @PrimaryGeneratedColumn()
  readonly furniture_id!: number

  @Column()
  furniture_name!: string

  @Column()
  price_per_unit!: number

  @Column()
  width!: number

  @Column()
  length!: number

  @Column()
  height!: number

  @Column()
  weight!: number

  @Column()
  img!: string

  @OneToMany(
    () => ProjectFurniture,
    (ProjectFurniture) => ProjectFurniture.project_furniture_id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  projectFurniture?: ProjectFurniture[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at!: Date
}
