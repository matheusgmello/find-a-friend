import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Caozinho Guia',
      email: 'caoguia@gmail.com',
      whatsapp: '8198957574',
      cep: '78954789',
      endereco: 'Rua Joao',
      estado: 'PR',
      cidade: 'Curitiba',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'caoguia@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
