import { useMemo } from 'react'

import { formatPhoneNumber } from '@/utils/format-phone-number'
import whatsappFill from '@/assets/icons/ri_whatsapp-fill.svg'

import { Container } from './styles'

type ChipPhoneNumberProps = {
  phoneNumber: string
}

export function ChipPhoneNumber({ phoneNumber }: ChipPhoneNumberProps) {
  const numberFormatted = useMemo(() => {
    return formatPhoneNumber(phoneNumber)
  }, [phoneNumber])

  return (
    <Container>
      <img src={whatsappFill} alt="" />
      <span>{numberFormatted}</span>
    </Container>
  )
}
