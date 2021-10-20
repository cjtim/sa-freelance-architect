import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class DefaultColumns {
  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at?: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at?: Date
}
