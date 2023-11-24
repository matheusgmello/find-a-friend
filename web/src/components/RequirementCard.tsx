import { WarningCircle, X } from 'phosphor-react'

interface RequirementCardProps {
  description?: string
  hasDeleteOption?: boolean
  onDeleteRequirement?: (requirement) => void
}

export function RequirementCard({
  description,
  hasDeleteOption,
  onDeleteRequirement,
}: RequirementCardProps) {
  function handleDeleteRequirement(description: string) {
    onDeleteRequirement(description)
  }

  return (
    <div
      style={{
        background:
          'linear-gradient(129.72deg, rgba(247, 95, 96, 0.1) 16.45%, rgba(241, 81, 86, 0) 67.3%)',
      }}
      className="border w-full gap-3 flex justify-between items-center text-red-500 border-red-500 rounded-lg py-4 px-10 max-md:px-4"
    >
      <WarningCircle className="max-md:hidden" size={24} />
      <p className="font-semibold text-lg flex-1 truncate">{description}</p>
      {hasDeleteOption && (
        <button
          onClick={() => handleDeleteRequirement(description)}
          type="button"
          className="flex justify-center items-center border-2 border-red-700 rounded-lg"
        >
          <X className="text-red-700" size={20} />
        </button>
      )}
    </div>
  )
}
