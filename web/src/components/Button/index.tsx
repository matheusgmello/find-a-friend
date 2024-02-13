import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return <Container {...rest}>{children}</Container>
}
