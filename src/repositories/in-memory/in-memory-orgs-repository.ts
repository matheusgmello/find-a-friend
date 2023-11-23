import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      cep: data.cep,
      endereco: data.endereco,
      estado: data.estado,
      cidade: data.cidade,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findManyByStateAndCity(data: { city: string; state: string }) {
    const orgs = this.items.filter(
      (org) => org.cidade === data.city && org.estado === data.state,
    )

    return orgs
  }
}
