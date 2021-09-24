import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Files } from './files'

@Entity()
export class Projects {
  constructor(job: Omit<Projects, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  name!: string

  @Column()
  lineUid!: string

  @OneToMany(() => Files, (Files) => Files.id)
  Files?: Files[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
