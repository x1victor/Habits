import dayjs from 'dayjs'
export function generateDatesFromYearBeginning() {
    // primeiro dia do ano
  const firstDayOfTheYear = dayjs().startOf('year')
  // data de hoje
  const today = new Date()
  // cria um vetor contendo os dias gerados
  const dates = []
  // variar de 01/01/2023 até 28/03/2023
  let compareDate = firstDayOfTheYear
  while (compareDate.isBefore(today)) {
    // insere no vetor de datas
    dates.push(compareDate.toDate())
    // incremento da data inicial
    compareDate = compareDate.add(1, 'day')
  }
  return dates
}
