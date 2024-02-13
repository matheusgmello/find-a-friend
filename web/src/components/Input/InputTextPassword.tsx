import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'

import { Container, ErrorMessage, InputWrapper } from './styles'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
  type: 'password'
}

export const InputTextPassword = forwardRef<any, InputTextProps>(
  ({ label, errorMessage, ...rest }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
      <>
        <Container>
          <label htmlFor={rest.name}>{label}</label>
          <InputWrapper>
            <input
              id={rest.name}
              ref={ref}
              {...rest}
              type={isPasswordVisible ? 'text' : 'password'}
            />
            {isPasswordVisible ? (
              <Eye
                size={24}
                color="#003b66"
                weight="bold"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              />
            ) : (
              <EyeSlash
                size={24}
                color="#003b66"
                weight="bold"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              />
            )}
          </InputWrapper>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Container>
      </>
    )
  },
)

InputTextPassword.displayName = 'InputTextPassword'
