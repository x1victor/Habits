import { HabitDay } from "./HabitDay";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
const weekDays = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
  ];
  // vetor de datas
  const summaryDates = generateDatesFromYearBeginning()
 // tamanho mínimo de data
  const minimumSummaryDatesSize = 18 * 7 // 18 semanas
  // qtde de dias para completar
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length


  export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
          {     weekDays.map((weekDay, i) => {
            return (
              <div
                key={`${weekDay}-${i}`}
                className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
              >
                {weekDay}
              </div>

            )
          })}
        </div>
          
        <div className="grid grid-rows-7 grid-flow-col gap-3">
            {summaryDates.map(date => {
          return <HabitDay key={date.toString()}/>
          })}

{amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
          return (
            <div 
              key={i} 
              className="w-10 h-10 bg-red-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          )
        })}


        </div>

      </div>
  
    )
  }