function prepareDate(date: string): { timeString: string; dateString: string } {
  const d = new Date(date)
  const timeOptions = { hour: 'numeric', minute: 'numeric' };
  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const timeString = d.toLocaleString('ru-RU', timeOptions)
  const dateString = d.toLocaleString('ru-RU', dateOptions)
  return { timeString, dateString }
}

function parseDate(date: string): string {
  const { timeString, dateString } = prepareDate(date);
  return `${dateString} ${timeString}`
}

function parseDateTimeFirst(date: string): string {
  const { timeString, dateString } = prepareDate(date);
  return `${timeString}, ${dateString}`
}

export const parseDateHelper = {
  parseDate,
  parseDateTimeFirst
}
