import { SelectComponent } from '@/components/Select'
import { PetContext } from '@/context/PetContext'
import { PetAge, PetIndependence, PetSize } from '@/models/interfaces/Pet'
import {
  ageOptions,
  energyOptions,
  independencyOptions,
  sizeOptions,
} from '@/utils/petsOptions'
import { useContext } from 'react'

interface FilterProps {
  className?: string
  isMobile?: boolean
}

export function Filter({ className, isMobile }: FilterProps) {
  const {
    changePetAge,
    changePetEnergy,
    changePetIndependence,
    changePetSize,
  } = useContext(PetContext)
  function handleChangePetAge(age: PetAge) {
    changePetAge(age)
  }
  function handleChangePetEnergy(energy: number) {
    changePetEnergy(energy)
  }
  function handleChangePetSize(size: PetSize) {
    changePetSize(size)
  }
  function handleChangePetIndependence(independence: PetIndependence) {
    changePetIndependence(independence)
  }
  return (
    <div className={`flex flex-col ${className} py-9 max-md:px-6 px-14`}>
      {!isMobile && <h1 className="text-xl leading-8 mb-7">Filtros</h1>}
      <div className="flex flex-col gap-8">
        <SelectComponent
          name="Idade"
          options={ageOptions}
          id="age"
          selectLabel="Idade"
          label="Idade"
          onValueChange={(value: PetAge) => {
            handleChangePetAge(value)
          }}
          className="flex font-bold justify-between gap-2 items-center py-4 bg-red-400 px-10 rounded-2xl"
        />
        <SelectComponent
          name="Nível de energia"
          options={energyOptions}
          id="energy"
          selectLabel="Nível de energia"
          label="Nível de energia"
          className="flex font-bold justify-between gap-2 items-center py-4 bg-red-400 px-10 rounded-2xl"
          onValueChange={(value) => {
            handleChangePetEnergy(Number(value))
          }}
        />
        <SelectComponent
          name="Porte do animal"
          options={sizeOptions}
          id="size"
          selectLabel="Porte do Animal"
          label="Porte do Animal"
          className="flex font-bold justify-between gap-2 items-center py-4 bg-red-400 px-10 rounded-2xl"
          onValueChange={(value: PetSize) => {
            handleChangePetSize(value)
          }}
        />
        <SelectComponent
          name="independência"
          options={independencyOptions}
          id="independency"
          selectLabel="Nível de independência"
          label="Nível de independência"
          className="flex font-bold justify-between gap-2 items-center py-4 bg-red-400 px-10 rounded-2xl"
          onValueChange={(value: PetIndependence) => {
            handleChangePetIndependence(value)
          }}
        />
      </div>
    </div>
  )
}
