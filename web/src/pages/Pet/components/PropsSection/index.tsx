import { Circle, CornersIn, CornersOut, Lightning } from 'phosphor-react'
import { PropContainer } from './components/PropContainer'
import { CompletePet, PetEnvironment, PetSize } from '@/models/interfaces/Pet'

interface PropsSectionProps {
  currentPet: CompletePet
}

function formatIndependenceString(env: PetEnvironment) {
  switch (env) {
    case 'small':
      return 'Ambiente pequeno'
    case 'medium':
      return 'Ambiente médio'
    default:
      return 'Ambiente amplo'
  }
}

function formatIndependenceIcon(env: PetEnvironment) {
  switch (env) {
    case 'small':
      return <Circle className="text-blue-900" size={20} />
    case 'medium':
      return <CornersIn className="text-blue-900" size={20} />
    default:
      return <CornersOut className="text-blue-900" size={20} />
  }
}

function formatSize(size: PetSize) {
  switch (size) {
    case 'small':
      return 0
    case 'medium':
      return 1
    default:
      return 2
  }
}

function formatSizeString(size: PetSize) {
  switch (size) {
    case 'small':
      return 'Pequenino'
    case 'medium':
      return 'Médio'
    default:
      return 'Grande'
  }
}

export function PropsSection({ currentPet }: PropsSectionProps) {
  return (
    <section
      className="mt-11 flex max-md:flex-col max-md:gap-4 justify-between items-center"
      id="stats"
    >
      <PropContainer id="Energy">
        <div className="flex justify-start items-center">
          {Array.from({ length: 5 }, (_, index) => index).map((energy) => (
            <Lightning
              weight={energy >= currentPet.energy ? 'fill' : 'regular'}
              opacity={energy >= currentPet.energy ? 0.3 : 1}
              className="text-blue-900"
              size={20}
              key={energy}
            />
          ))}
        </div>
        <p className="text-blue-900 text-lg font-semibold">
          {currentPet.energy <= 2
            ? 'Pouca energia'
            : currentPet.energy > 2 && currentPet.energy < 4
            ? 'Normal'
            : 'Muita energia'}
        </p>
      </PropContainer>
      <PropContainer id="Independence">
        <div className="flex justify-start items-center">
          {formatIndependenceIcon(currentPet.environment)}
        </div>
        <p className="text-blue-900 text-lg font-semibold">
          {formatIndependenceString(currentPet.environment)}
        </p>
      </PropContainer>

      <PropContainer id="Size">
        <div className="flex justify-start items-center">
          {Array.from({ length: 3 }, (_, index) => index).map((Size) => (
            <Circle
              weight={'fill'}
              opacity={formatSize(currentPet.size) >= Size ? 1 : 0.3}
              className="text-blue-900"
              size={20}
              key={Size}
            />
          ))}
        </div>
        <p className="text-blue-900 text-lg font-semibold">
          {formatSizeString(currentPet.size)}
        </p>
      </PropContainer>
    </section>
  )
}
