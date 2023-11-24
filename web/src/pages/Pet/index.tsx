import { PetAside } from '@/components/PetAside'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { PetContext } from '@/context/PetContext'
import { MapSection } from './components/MapSection'
import { PetInfoSection } from './components/PetInfoSection'
import { PetOrgSection } from './components/PetOrgSection'
import { PropsSection } from './components/PropsSection'
import { RequirementsSection } from './components/RequirementsSection'
import { ContactSection } from './components/ContactSection'
export function Pet() {
  const [currentSelectedImage, setCurrentSelectedImage] = useState('')
  const {
    currentPet,
    currentPetGallery,
    orgCoords,
    getUniquePet,
    getPetGallery,
  } = useContext(PetContext)
  const { id } = useParams()
  const location = useLocation()

  useEffect(() => {
    getUniquePet(id)
    getPetGallery(id).then((url) => setCurrentSelectedImage(url))
  }, [location, id])

  if (currentPet) {
    return (
      <main className="flex max-md:flex-col">
        <PetAside />
        <div className="flex-1 flex flex-col items-center gap-10 bg-red-100 px-8 max-md:px-4 py-10 h-screen max-md:overflow-y-hidden overflow-y-auto home">
          <p className="text-blue-100 text-lg font-semibold">Seu novo amigo</p>
          <section className="flex flex-col max-w-3xl rounded-t-2xl w-full bg-white">
            <img
              className="rounded-t-2xl max-h-80 w-full object-cover"
              src={currentSelectedImage}
              alt={currentPet.name}
            />
            <div className="flex flex-col w-full px-16 max-md:px-6 py-8">
              {currentPetGallery.length > 0 && (
                <RadioGroup.Root
                  draggable
                  defaultValue={currentPetGallery[0].photo_url}
                  onValueChange={(value) => {
                    if (value) {
                      setCurrentSelectedImage(value)
                    } else {
                      setCurrentSelectedImage(currentPet.photo_url)
                    }
                  }}
                  className="flex gap-4 focus:shadow-none max-md:p-1 max-md:overflow-x-auto"
                >
                  {currentPetGallery.map((image) => (
                    <RadioGroup.Item
                      asChild
                      key={image.id}
                      value={image.photo_url}
                    >
                      <img
                        className="rounded-2xl hover:brightness-75 cursor-pointer w-20 h-20 object-cover data-[state=checked]:ring-4 data-[state=checked]:ring-blue-900 data-[state=unchecked]:opacity-50"
                        src={image.photo_url}
                        alt={image.image}
                      />
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              )}
              <PetInfoSection currentPet={currentPet} />
              <PropsSection currentPet={currentPet} />
              <MapSection coords={orgCoords} />

              {currentPet.org && (
                <>
                  <hr className="my-10" />

                  <PetOrgSection currentPet={currentPet} />
                  <hr className="my-10" />
                </>
              )}

              <RequirementsSection />
              {currentPet.org && (
                <>
                  <hr className="my-10" />
                  <ContactSection currentPet={currentPet} />
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    )
  }
}
