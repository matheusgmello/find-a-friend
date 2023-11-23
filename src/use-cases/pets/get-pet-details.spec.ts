import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetDetailsUseCase } from './get-pet-details'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetDetailsUseCase(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: 'org-id',
      name: 'Caoguia',
      email: 'caoguia@gmail.com',
      whatsapp: '41989548587',
      cep: '78954456',
      estado: 'PR',
      cidade: 'Curitiba',
      endereco: 'Rua deputado leopoldo',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to get pet details', async () => {
    const createdPet = await petsRepository.create({
      name: 'Toby',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id',
    })

    const { pet, org } = await sut.execute({
      pet_id: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(org.id).toEqual(expect.any(String))
  })
})
