import Fastify from 'fastify'
import cors from '@fastify/cors'
import { AppRoutes } from './routes'
const app = Fastify()
app.register(cors) // registra segurança na aplicação
app.register(AppRoutes) // registra as rotas na aplicação
app.listen({
    port: 3333,
})
.then( () => {
    console.log('Http Server running')
})
