import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

describe('Get Details Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get details of a pet', async () => {
    await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        name: 'Toby',
        about: 'Um poodle com 2 anos de idade',
        age: '2',
        ambience: '2',
        energy_level: '1',
        size: 'plus',
        level_independence: '1',
        org_id: org.id,
      },
    })

    const response = await request(app.server).post(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
  })
})
