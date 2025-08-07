import { fastifyCors } from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts'
import { env } from './utils/env.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'Ok'
})

app.register(createQuestionRoute)
app.register(createRoomRoute)
app.register(getRoomQuestionsRoute)
app.register(getRoomsRoute)

app.listen({ port: env.PORT })
