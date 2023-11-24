import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Caozinho Guia',
      email: 'caoguia@gmail.com',
      password: '123456',
      whatsapp: '8198957574',
      cep: '78954789',
      endereco: 'Rua Joao',
      estado: 'PR',
      cidade: 'Curitiba',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'caoguia@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
