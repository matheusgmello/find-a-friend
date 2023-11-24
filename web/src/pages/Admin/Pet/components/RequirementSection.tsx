import { Button } from '@/components/Button'
import { InputForm } from '@/components/InputForm'
import { RequirementCard } from '@/components/RequirementCard'
import { Plus } from 'phosphor-react'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface RequirementSectionProps {
  requirements: string[]
  setRequirements: Dispatch<SetStateAction<string[]>>
  errorMessage?: string
}

export function RequirementSection({
  requirements,
  setRequirements,
  errorMessage,
}: RequirementSectionProps) {
  const [requirement, setRequirement] = useState('')

  function handleAddNewRequirement(requirement: string) {
    if (requirement) {
      setRequirements((state) => [...state, requirement])
      setRequirement('')
    }
  }

  function onDeleteRequirement(requirement: string) {
    setRequirements((state) => state.filter((x) => x !== requirement))
  }

  return (
    <section className="text-blue-900 flex flex-col gap-8">
      <h1 className="font-extrabold text-3xl">Requesitos para adoção</h1>
      <hr />
      <div className="flex flex-col gap-3">
        <InputForm
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setRequirement(event.target.value)
          }}
          label="Requisito"
          value={requirement}
        />
        <Button
          onClick={() => handleAddNewRequirement(requirement)}
          type="button"
          className="border border-dashed rounded-lg border-red-700 bg-red-500 bg-opacity-10 py-6"
        >
          <Plus className="text-red-700" size={16} />
        </Button>
        {errorMessage && (
          <p className="font-semibold text-red-400 ">{errorMessage}</p>
        )}
        {requirements.map((requirement, index) => (
          <RequirementCard
            key={index}
            description={requirement}
            hasDeleteOption={true}
            onDeleteRequirement={onDeleteRequirement}
          />
        ))}
      </div>
    </section>
  )
}
