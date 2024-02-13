import { forwardRef, InputHTMLAttributes } from 'react'
import { Plus } from 'phosphor-react'

import { Container, ErrorMessage, InputWrapper } from './styles'
import { AddButton } from '@/pages/PetCreate/styles'

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: 'file'
  errorMessage?: string
}

export const InputFile = forwardRef<any, InputFileProps>(
  ({ label, errorMessage, type = 'file', ...rest }, ref) => {
    return (
      <>
        <Container>
          <label htmlFor={rest.name}>
            <p style={{ marginBottom: 8 }}>{label}</p>
            <InputWrapper>
              <span>Escolha até 6 imagens</span>
              <input
                style={{
                  width: 0,
                  height: 0,
                  opacity: 0,
                  visibility: 'hidden',
                }}
                id={rest.name}
                type={type}
                ref={ref}
                {...rest}
              />
            </InputWrapper>

            <AddButton as="div" role="button">
              <Plus size={20} />
            </AddButton>
          </label>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Container>
      </>
    )
  },
)

InputFile.displayName = 'InputFile'
