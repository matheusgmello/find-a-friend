import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchPetsByStateAndCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-state-and-city-use-case'
import { FetchPetsFilters } from '@/use-cases/pets/fetch-pets-by-state-and-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPetsByStateAndCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestParamsSchema = z.object({
    city: z.string(),
    state: z.enum([
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ]),
  })

  const requestQueryStringSchema = z.object({
    age: z.enum(['PUPPY', 'ADULT', 'ELDERLY']).optional(),
    ambience: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    energy_level: z
      .enum(['VERY_LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY_HIGH'])
      .optional(),
    level_independence: z.enum(['LOW', 'AVERAGE', 'HIGH']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
  })

  const { city, state } = requestParamsSchema.parse(request.params)
  const filters = requestQueryStringSchema.parse(
    request.query,
  ) as FetchPetsFilters

  const fetchPetsByStateAndCityUseCase = makeFetchPetsByStateAndCityUseCase()

  try {
    const { pets } = await fetchPetsByStateAndCityUseCase.execute({
      city,
      state,
      filters,
    })

    return reply.send({ pets })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
