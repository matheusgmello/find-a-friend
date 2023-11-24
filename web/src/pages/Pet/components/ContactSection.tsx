import { CompletePet } from '@/models/interfaces/Pet'
import { WhatsappLogo } from 'phosphor-react'

interface ContactSectionProps {
  currentPet: CompletePet
}

export function ContactSection({ currentPet }: ContactSectionProps) {
  return (
    <section id="contact">
      <a
        className="text-white flex justify-center items-center py-5 w-full rounded-3xl bg-green-400 gap-4"
        href={`https://api.whatsapp.com/send?phone=${currentPet.org.whatsappNumber}&text=Olá vim pelo aplicativo Find A Friend, Gostaria de saber mais informações sobre o PET: ${currentPet.name}`}
      >
        <WhatsappLogo weight="bold" size={24} />
        <p className="text-lg font-extrabold">Entrar em contato</p>
      </a>
    </section>
  )
}
