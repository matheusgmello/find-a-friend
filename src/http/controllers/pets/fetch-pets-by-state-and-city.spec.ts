import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Pets - Fetch Pets By State and City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by state and city', async () => {
    await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        name: 'Toby',
        about: 'Um poodle com 2 anos de idade',
        age: 'PUPPY',
        ambience: '2',
        energy_level: '1',
        size: 'plus',
        level_independence: '1',
        org_id: org.id,
      },
    })

    const response = await request(app.server).get('/pets/PR/Curitiba').query({
      age: 'PUPPY',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.pets[0].name).toBe('Toby')
  })
})
