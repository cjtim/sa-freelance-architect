/**
 * 
 * @param obj 
 * @param key 
 * @returns {object} sorted
 * 
 * Usage
 * ```js
        const sortedByName = sortBy(arrayObj, 'name')
    ```
 */

export const sortBy = <T extends object>(
  obj: T[],
  key: keyof T,
  asc = true,
): T[] => {
  const [aa, bb] = asc ? [1, -1] : [-1, 1]
  return obj.sort((a, b) => (a[key] > b[key] ? aa : bb))
}
