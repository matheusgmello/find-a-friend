import Logo from '@/assets/icons/logo.svg'
import { CompletePet } from '@/models/interfaces/Pet'
import { WhatsappLogo } from 'phosphor-react'

export interface PetOrgSectionProps {
  currentPet: CompletePet
}

export function PetOrgSection({ currentPet }: PetOrgSectionProps) {
  const numero = currentPet.org.whatsappNumber

  const formatNumber = numero.replace(
    /^(\+\d{2})(\d{2})(\d{5})(\d{4})$/,
    '$1 $2  $3 - $4',
  )

  return (
    <section className="flex flex-col">
      <div className="flex max-md:flex-col gap-4">
        <img
          className="bg-orange-600 max-w-[64] max-h-16 rounded-2xl p-4"
          src={Logo}
          alt=""
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col text-blue-900">
            <h1 className="font-bold text-3xl">{currentPet.org.nome}</h1>
            <p className="font-semibold text-base">
              {currentPet.org.address}, {currentPet.city}
            </p>
          </div>
          <span className="flex gap-2 text-blue-900 justify-center items-center text-lg bg-blue-900 bg-opacity-10 py-3 px-2 rounded-xl">
            <WhatsappLogo weight="fill" size={24} />
            {formatNumber}
          </span>
        </div>
      </div>
    </section>
  )
}
