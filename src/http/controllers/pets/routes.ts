import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { getDetails } from './get-details'
import { fetchPetsByStateAndCity } from './fetch-pets-by-state-and-city'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:state/:city', fetchPetsByStateAndCity)
  app.get('/pets/:petId', getDetails)

  app.post('/pets', { onRequest: verifyJwt }, create)
}
