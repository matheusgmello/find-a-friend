import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    level_independence: z.string(),
    ambience: z.string(),
  })

  const { name, about, age, size, energy_level, level_independence, ambience } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy_level,
    level_independence,
    ambience,
    org_id: request.user.sub,
  })

  return reply.status(201).send()
}
