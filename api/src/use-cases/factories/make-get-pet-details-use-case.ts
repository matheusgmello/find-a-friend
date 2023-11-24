import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetPetDetailsUseCase } from '../pets/get-pet-details'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetPetDetailsUseCase(petsRepository, orgsRepository)

  return useCase
}
