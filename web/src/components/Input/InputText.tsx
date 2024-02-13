import { forwardRef, InputHTMLAttributes } from 'react'

import { Container, ErrorMessage, InputWrapper } from './styles'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
}

export const InputText = forwardRef<any, InputTextProps>(
  ({ label, errorMessage, ...rest }, ref) => {
    return (
      <>
        <Container>
          <label htmlFor={rest.name}>{label}</label>
          <InputWrapper>
            <input id={rest.name} ref={ref} {...rest} />
          </InputWrapper>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Container>
      </>
    )
  },
)

InputText.displayName = 'InputText'
