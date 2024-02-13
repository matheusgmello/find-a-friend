import whatsappWhite from '@/assets/icons/whatsapp.svg'

import { Container } from './styles'

type ButtonWhatsAppProps = {
  label: string
  whatsappNumber: string
}

export function ButtonWhatsApp({ label, whatsappNumber }: ButtonWhatsAppProps) {
  return (
    <Container
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
    >
      <img src={whatsappWhite} alt="" />
      <span>{label}</span>
    </Container>
  )
}
