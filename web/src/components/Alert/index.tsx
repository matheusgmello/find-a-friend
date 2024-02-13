import { WarningCircle, X } from 'phosphor-react'

import { AlertContainer } from './styles'

interface AlertProps {
  text: string
  showIcon?: boolean
  showCloseButton?: boolean
  onClose?: () => void
}

export function Alert({
  text,
  showIcon = true,
  showCloseButton = false,
  onClose,
}: AlertProps) {
  return (
    <AlertContainer>
      {showIcon && <WarningCircle size={24} />}
      <span>{text}</span>
      {showCloseButton && (
        <button type="button" onClick={onClose}>
          <X size={16} weight="bold" />
        </button>
      )}
    </AlertContainer>
  )
}
