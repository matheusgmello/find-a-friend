import { forwardRef, TextareaHTMLAttributes } from 'react'

import { Container, ErrorMessage, InputWrapper } from './styles'

interface InputTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  labelExtraText?: string
  errorMessage?: string
}

export const InputTextArea = forwardRef<any, InputTextAreaProps>(
  ({ label, labelExtraText = '', errorMessage, ...rest }, ref) => {
    return (
      <>
        <Container>
          <label htmlFor={rest.name}>
            {label}
            <span>{labelExtraText}</span>
          </label>
          <InputWrapper>
            <textarea id={rest.name} ref={ref} {...rest} />
          </InputWrapper>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Container>
      </>
    )
  },
)

InputTextArea.displayName = 'InputTextArea'
