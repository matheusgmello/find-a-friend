import { useContext } from 'react'
import { PetContext } from '@/context/PetContext'
import { RequirementCard } from '@/components/RequirementCard'

export function RequirementsSection() {
  const { adoptionRequirements } = useContext(PetContext)

  return (
    <section className="flex flex-col gap-10" id="requirements">
      <h1 className="text-3xl font-bold text-blue-900">
        Requesitos para adoção
      </h1>
      <div className="flex flex-col gap-3">
        {adoptionRequirements.map((requirement) => (
          <RequirementCard
            key={requirement.id}
            description={requirement.title}
          />
        ))}
      </div>
    </section>
  )
}
