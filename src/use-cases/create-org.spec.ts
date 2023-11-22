import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create ORG Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute({
      name: 'Caoguia',
      email: 'caoguia@gmail.com',
      whatsapp: '41989548587',
      cep: '78954456',
      estado: 'PR',
      cidade: 'Curitiba',
      endereco: 'Rua deputado leopoldo',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Caoguia',
      email: 'caoguia@gmail.com',
      whatsapp: '41989548587',
      cep: '78954456',
      estado: 'PR',
      cidade: 'Curitiba',
      endereco: 'Rua deputado leopoldo',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'Caoguia',
      email,
      whatsapp: '41989548587',
      cep: '78954456',
      estado: 'PR',
      cidade: 'Curitiba',
      endereco: 'Rua deputado leopoldo',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Caoguia',
        email,
        whatsapp: '41989548587',
        cep: '78954456',
        estado: 'PR',
        cidade: 'Curitiba',
        endereco: 'Rua deputado leopoldo',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
