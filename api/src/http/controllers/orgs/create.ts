import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    whatsapp: z.string(),
    cep: z.string(),
    endereco: z.string(),
    estado: z.string(),
    cidade: z.string(),
  })

  const { name, email, password, whatsapp, cep, endereco, estado, cidade } =
    createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    await createOrgUseCase.execute({
      name,
      email,
      password,
      whatsapp,
      cep,
      endereco,
      estado,
      cidade,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send()
    }

    throw error
  }

  return reply.status(201).send()
}
