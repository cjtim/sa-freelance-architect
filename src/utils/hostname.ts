export const hostname =
  (typeof window !== 'undefined' &&
    `${window.location.protocol}://${window.location.host}`) ||
  ''
