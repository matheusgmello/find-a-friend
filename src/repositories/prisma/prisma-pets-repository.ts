import { Prisma } from '@prisma/client'
import { PetFindManyByOrgIds, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { extractProperties } from '@/utils/extract-properties'
import { FetchPetsFilters } from '@/use-cases/pets/fetch-pets-by-state-and-city'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByOrgIds(data: PetFindManyByOrgIds) {
    const selectedFilters = extractProperties(
      ['age', 'ambience', 'energy_level', 'level_independence', 'size'],
      data.filters,
    ) as FetchPetsFilters | null

    const whereQuery = { org_id: { in: data.orgIds } }

    if (selectedFilters) {
      for (const key of Object.keys(selectedFilters) as Array<
        keyof FetchPetsFilters
      >) {
        Reflect.defineProperty(whereQuery, key, {
          value: selectedFilters[key],
          enumerable: true,
        })
      }
    }

    const pets = await prisma.pet.findMany({
      where: whereQuery,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
