import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Caoguia',
      email: 'caoguia@gmail.com',
      whatsapp: '41989548587',
      cep: '78954456',
      estado: 'PR',
      cidade: 'Curitiba',
      endereco: 'Rua deputado leopoldo',
      password_hash: await hash('123456', 6),
    })

    const { pet } = await sut.execute({
      name: 'Toby',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet with an inexistence org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Toby',
        about: 'Um poodle com 2 anos de idade',
        age: '2',
        ambience: '2',
        energy_level: '1',
        size: 'plus',
        level_independence: '1',
        org_id: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
