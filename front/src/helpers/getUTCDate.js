import format from 'date-fns/format'

const getUTCDate = (dateString = Date.now()) => {
  const date = new Date(dateString)
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
}

export const UTCDate = (date, dateFormat) => {
  return format(getUTCDate(date), dateFormat)
}
