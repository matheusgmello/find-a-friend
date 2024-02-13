import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { toast } from 'react-toastify'

import LogoHorizontal from '@/assets/icons/logo-horizontal.svg'
import Pets from '@/assets/icons/pets.svg'
import { InputText } from '@/components/Input/InputText'
import { InputTextPassword } from '@/components/Input/InputTextPassword'
import { useAuthOrg } from '@/contexts/AuthOrgContext'

import {
  Button,
  Buttons,
  Card,
  Container,
  Form,
  FormWrapper,
  Wrapper,
} from './styles'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
})

type LoginForm = z.infer<typeof loginSchema>

export function Login() {
  const { signIn } = useAuthOrg()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const navigate = useNavigate()

  async function handleLogin(loginForm: LoginForm) {
    try {
      await signIn(loginForm)
      toast.success('Login realizado com sucesso')
      navigate('/pet-create')
    } catch (err) {
      toast.error('Erro ao fazer login')
    }
  }

  function handleRegisterOrganization() {
    navigate('/register')
  }

  return (
    <Wrapper>
      <Container>
        <Card>
          <img src={LogoHorizontal} className="logo" alt="" />
          <img src={Pets} alt="" />
        </Card>
        <FormWrapper>
          <h1>Boas-vindas!</h1>
          <Form onSubmit={handleSubmit(handleLogin)}>
            <InputText
              label="Email"
              placeholder="Email"
              errorMessage={errors.email?.message}
              {...register('email')}
            />

            <InputTextPassword
              label="Senha"
              placeholder="Senha"
              type="password"
              errorMessage={errors.password?.message}
              {...register('password')}
            />

            <Buttons>
              <Button type="submit" className="primary">
                Login
              </Button>
              <Button
                type="button"
                onClick={handleRegisterOrganization}
                className="secondary"
              >
                Cadastrar minha organização
              </Button>
            </Buttons>
          </Form>
        </FormWrapper>
      </Container>
    </Wrapper>
  )
}
