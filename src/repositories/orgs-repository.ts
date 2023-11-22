import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
