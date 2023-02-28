import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
const app = Fastify()

app.get('/hello', () => {
return 'Hello World'
})

app.listen({
    port: 3333,
   })
   .then( () => {
    console.log('Http Server running')
   })

    const prisma = new PrismaClient()
    app.register(cors)
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
