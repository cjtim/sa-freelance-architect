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
export class Project {
  constructor(job: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, job)
  }

  @PrimaryGeneratedColumn()
  readonly id!: number

  @Column()
  name!: string

  @Column()
  lineUid!: string

  @OneToMany(() => Files, (Files) => Files.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  Files?: Files[]

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date
}
