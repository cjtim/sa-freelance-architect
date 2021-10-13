// NewRow - eliminate readonly field,
// which will auto create in database
export type NewRow<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
