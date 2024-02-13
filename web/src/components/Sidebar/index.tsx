import { useNavigate } from 'react-router-dom'

import logo from '@/assets/icons/logo.svg'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import { Button } from '~/Button'

import { Container } from './styles'

export function Sidebar() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Container>
      <img src={logo} alt="" />

      <Button onClick={handleGoBack}>
        <img src={arrowLeft} alt="" />
      </Button>
    </Container>
  )
}
