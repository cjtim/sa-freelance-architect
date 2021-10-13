// NewRow - eliminate readonly field,
// which will auto create in database
export type NewRow<T> = Omit<
  T,
  | 'project_id'
  | 'architect_id'
  | 'furniture_id'
  | 'customer_id'
  | 'task_id'
  | 'file_id'
  | 'project_furniture_id'
  | 'receipt_id'
  | 'id'
  | 'created_at'
  | 'updated_at'
>
