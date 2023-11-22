import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  cep: string
  endereco: string
  estado: string
  cidade: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp,
    cep,
    endereco,
    estado,
    cidade,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      whatsapp,
      cep,
      endereco,
      estado,
      cidade,
    })

    return {
      org,
    }
  }
}
