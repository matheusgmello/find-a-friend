import { Aside } from '@/components/Aside'
import { Card } from '@/components/Card'
import { SelectComponent } from '@/components/Select'
import { petOptions } from '@/utils/petsOptions'
import { useContext } from 'react'
import { PetContext } from '@/context/PetContext'
import { PetType } from '@/models/interfaces/Pet'
export function Map() {
  const { pets, changePetType } = useContext(PetContext)

  function handleChangePetType(type: PetType) {
    changePetType(type)
  }

  return (
    <div className="flex max-md:flex-col max-md:overflow-y-auto">
      <Aside />

      <div className="flex-1 bg-red-100 max-md:pt-12 pt-40 px-8 pb-12 h-screen max-md:overflow-y-hidden overflow-y-auto home">
        <div className="flex max-md:flex-col max-md:gap-6 items-center justify-between mb-11 ">
          <p className="text-xl leading-8 font-normal max-md:text-center text-blue-900">
            Encontre
            <span className="font-extrabold"> {pets.length} amigos</span> na sua
            cidade
          </p>
          <div className="relative max-md:w-full">
            <SelectComponent
              name="pets"
              selectLabel="Selecione os tipos"
              id="pets"
              options={petOptions}
              defaultValue={petOptions[0].value}
              className="w-52 h-12 flex items-center justify-between py-4 px-5 border-none rounded-2xl max-md:w-full bg-red-150 outline-none appearance-none font-Nunito text-base text-blue-900"
              onValueChange={(value: PetType) => {
                handleChangePetType(value)
              }}
            />
          </div>
        </div>
        <div className="grid justify-items-center items-start grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-8">
          {!!pets &&
            pets.map((pet) => (
              <Card
                to={`/Pet/${pet.id}`}
                key={pet.id}
                path={pet.photo_url}
                type={pet.type}
                name={pet.name}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
