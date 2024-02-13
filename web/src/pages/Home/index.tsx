import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '@/assets/icons/logo.svg'
import searchIcon from '@/assets/icons/search.svg'
import dogHero from '@/assets/images/dog-hero.png'
import { useCitys, useStates } from '@/hooks/use-location'
import { Button } from '~/Button'
import { Select } from '~/Select'

import {
  ActionsContainer,
  AsideRight,
  Container,
  Content,
  Footer,
  Header,
  HeaderText,
  HeroText,
  LoginButton,
  RegisterButton,
  Text,
  Wrapper,
} from './styles'

export function Home() {
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const states = useStates()
  const citys = useCitys(state)

  const navigate = useNavigate()

  function handleSearchPets() {
    const queryParams = new URLSearchParams({
      state,
      city,
    })
    navigate(`/map?${queryParams.toString()}`)
  }

  async function handleChangeState(e: any) {
    setState(e.target.value)
  }

  function handleChangeCity(e: any) {
    setCity(e.target.value)
  }

  return (
    <Container>
      <Wrapper>
        <Header>
          <img src={logo} alt="" />
          <HeaderText>FindAFriend</HeaderText>

          <ActionsContainer>
            <LoginButton to="/login">Entrar</LoginButton>
            <RegisterButton to="/register">Registrar</RegisterButton>
          </ActionsContainer>
        </Header>
        <Content>
          <HeroText>Leve a felicidade para o seu lar</HeroText>
          <img src={dogHero} alt="" />
        </Content>
        <Footer>
          <Text>
            Encontre o animal de estimação ideal para seu estilo de vida!
          </Text>
          <AsideRight>
            <Text size="small">Busque um amigo:</Text>
            <Select
              name="UF"
              label=""
              options={states}
              onChange={handleChangeState}
            ></Select>
            <Select
              name="Cidade"
              label=""
              options={citys}
              onChange={handleChangeCity}
            ></Select>
            <Button onClick={handleSearchPets} disabled={!state || !city}>
              <img src={searchIcon} alt="" />
            </Button>
          </AsideRight>
        </Footer>
      </Wrapper>
    </Container>
  )
}
