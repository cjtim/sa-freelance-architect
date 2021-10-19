/**
 * NewRow - eliminate readonly field,
 * which will auto create in database
 */
export type NewRow<T> = Omit<
  T,
  | 'architect_id'
  | 'contract_id'
  | 'customer_id'
  | 'task_id'
  | 'file_id'
  | 'furniture_id'
  | 'project_furniture_id'
  | 'project_id'
  | 'receipt_id'
  | 'id'
  | 'created_at'
  | 'updated_at'
>
