import {FastifyInstance} from 'fastify'
import { prisma } from "./lib/prisma"
import dayjs from "dayjs"
import { z } from "zod"

export async function AppRoutes(app: FastifyInstance){
    app.get('/hello2', async () => {
        const habits = await prisma.habit.findMany({
            where: {
                title: {
                    startsWith: 'beber'
                }
            }        
        })

        return habits
    })

    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
          title: z.string(),
          weekDays: z.array(
            z.number().min(0).max(6)
          )
        })
        const { title, weekDays } = createHabitBody.parse(request.body)
        // cria a data com a hora 20230321:00:00
        const today = dayjs().startOf('day').toDate()
        await prisma.habit.create({
          data: {
            title,
            created_at: today,
            weekDays: {
              create: weekDays.map(weekDay => {
                return {
                  week_day: weekDay
                }
              })
            }
          }
        })
      })
      
      app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date() // converte string para date
        })
        const {date} = getDayParams.parse(request.query)
        // data do usuário com 20230102:00:00:00
        const parsedDate = dayjs(date).startOf('day')
          //segunda é 1
        const weekDay = parsedDate.get('day')
        // todos hábitos possívels
        // hábito precisa estar disponível no dia da semana
        // e não pode ter sido criado depois da data
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at:{
                    lte: date
                },
                weekDays: {
                    some: {
                        week_day: weekDay
                    }
                }
            }
        })
        // todos hábitos realizados
        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate()
            },
            include: {
                dayHabits: true
            }
        })
        const completedHabit = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        })
        return {
            possibleHabits,
            completedHabit
        }
    })

}
