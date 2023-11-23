import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByStateAndCity } from './fetch-pets-by-state-and-city'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetsByStateAndCity

describe('Fetch Pets By State and City', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchPetsByStateAndCity(orgsRepository, petsRepository)

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

    await orgsRepository.create({
      id: 'org-id-2',
      name: 'Caoguia',
      email: 'caoguia@gmail.com',
      whatsapp: '41989548587',
      cep: '78954456',
      estado: 'PR',
      cidade: 'Sao Jose dos Pinhais',
      endereco: 'Rua deputado leopoldo',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to fetch pets by state and city without other filters', async () => {
    await petsRepository.create({
      name: 'Toby',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Max',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id-2',
    })

    const { pets } = await sut.execute({
      state: 'PR',
      city: 'Curitiba',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Toby' })])
  })

  it('should be able to fetch pets by state and city with other filters', async () => {
    await petsRepository.create({
      name: 'Toby',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Max',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id-2',
    })

    const { pets } = await sut.execute({
      state: 'PR',
      city: 'Curitiba',
      filters: {
        age: '2',
        ambience: '2',
      },
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([expect.objectContaining({ name: 'Toby' })])
    expect(pets).toEqual([expect.objectContaining({ name: 'Max' })])
  })
})
