import { CompletePet } from '@/models/interfaces/Pet'

interface PetInfoSectionProps {
  currentPet: CompletePet
}
export function PetInfoSection({ currentPet }: PetInfoSectionProps) {
  return (
    <section className="flex flex-col gap-6 mt-16" id="title&description">
      <h1 className="text-blue-900 text-6xl font-extrabold">
        {currentPet.name}
      </h1>
      <p className="text-blue-900 font-semibold text-lg">
        {currentPet.description}
      </p>
    </section>
  )
}
