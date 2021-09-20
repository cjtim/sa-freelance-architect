import moment from 'moment'

export const formatDate = (date: Date): string =>
  moment(date).format('MMMM D YYYY, HH:mm:ss')
