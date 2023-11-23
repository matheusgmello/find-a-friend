import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {
  const getDetailsParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = getDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  const { org, pet } = await getPetDetailsUseCase.execute({
    pet_id,
  })

  return reply.status(200).send({
    org,
    pet,
  })
}
