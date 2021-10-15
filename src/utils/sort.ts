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

export const sortBy = <T extends object>(obj: T[], key: keyof T) =>
  obj.sort((a, b) => (a[key] > b[key] ? 1 : -1))
