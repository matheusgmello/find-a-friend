import { Pet, Prisma } from '@prisma/client'
import { PetFindManyByOrgIds, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { extractProperties } from '@/utils/extract-properties'
import { FetchPetsFilters } from '@/use-cases/fetch-pets-by-state-and-city'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByOrgIds({ orgIds, filters }: PetFindManyByOrgIds) {
    const pets = this.items.filter((pet) => {
      const selectedFilters = extractProperties(
        ['age', 'ambience', 'energy_level', 'level_independence', 'size'],
        filters,
      ) as FetchPetsFilters | null

      const doesOrgIdsInclude = orgIds.includes(pet.org_id)

      let matchFilters = true

      if (selectedFilters) {
        for (const key of Object.keys(selectedFilters) as Array<
          keyof FetchPetsFilters
        >) {
          if (pet[key] !== selectedFilters[key]) {
            matchFilters = false
            break
          }
        }
      }

      return doesOrgIdsInclude && matchFilters
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      level_independence: data.level_independence,
      ambience: data.ambience,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
