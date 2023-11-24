import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Caozinho Guia',
      email: 'caoguia@gmail.com',
      password: '123456',
      whatsapp: '8198957574',
      cep: '78954789',
      endereco: 'Rua Joao',
      estado: 'PR',
      cidade: 'Curitiba',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to register with same email', async () => {
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

    const response = await request(app.server).post('/orgs').send({
      name: 'Caozinho Guia',
      email: 'caoguia@gmail.com',
      password: '123456',
      whatsapp: '8198957574',
      cep: '78954789',
      endereco: 'Rua Joao',
      estado: 'PR',
      cidade: 'Curitiba',
    })

    expect(response.statusCode).toBe(409)
  })
})
