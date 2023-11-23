import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { getDetails } from './get-details'
import { fetchPetsByStateAndCity } from './fetch-pets-by-state-and-city'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, create)

  app.get('/pets/:state/:city', fetchPetsByStateAndCity)
  app.get('/pets/:petId', getDetails)
}
