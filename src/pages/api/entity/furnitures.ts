import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ProjectFurniture } from '.'
import { DefaultColumns } from './_default'

@Entity()
export class Furniture extends DefaultColumns {
  constructor(fur: Partial<Furniture>) {
    super()
    Object.assign(this, fur)
  }

  @PrimaryGeneratedColumn()
  readonly furniture_id?: number

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

  // Relation
  @OneToMany(
    () => ProjectFurniture,
    (projectFurniture) => projectFurniture.furniture,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'furniture_id' })
  projectFurniture?: ProjectFurniture[]
}
