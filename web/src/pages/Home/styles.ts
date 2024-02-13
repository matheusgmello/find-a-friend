import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.primary};
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 0 auto;
  padding: 120px 48px;
  width: 100%;
  max-width: calc(1216px + 96px);
  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-left: auto;
`

export const LoginButton = styled(Link)`
  background-color: transparent;
  color: ${(props) => props.theme.colors.tertiary};
  border: 2px solid ${(props) => props.theme.colors.tertiary};
  padding: 12px 24px;
  font-weight: bold;
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 20px;
  transition: filter 0.2s;

  :hover {
    filter: brightness(0.9);
  }
`

export const RegisterButton = styled(Link)`
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.secondary};
  border: 2px solid ${(props) => props.theme.colors.tertiary};
  padding: 12px 24px;
  font-weight: bold;
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 20px;
  transition: filter 0.2s;

  :hover {
    filter: brightness(0.9);
  }
`

export const HeaderText = styled.strong`
  display: block;
  font-size: 24px;
  font-weight: bold;
`

export const Content = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;
  gap: 2rem;

  img {
    width: 100%;
    max-width: 500px;
    justify-self: flex-end;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    grid-template-columns: 1fr;
    img {
      max-width: unset;
      justify-self: unset;
    }
  }
`

export const HeroText = styled.h1`
  font-style: normal;
  font-weight: 800;
  font-size: 72px;
  line-height: 90%;
  letter-spacing: -0.02em;
`

export const Footer = styled.footer`
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  > p {
    width: 30ch;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 60px;

    > p {
      width: unset;
    }
  }
`

type TextProps = {
  size?: 'small' | 'medium' | 'large'
}

export const Text = styled.p<TextProps>`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  ${(props) =>
    props.size === 'small' &&
    css`
      font-size: 16px;
      line-height: 24px;
    `}
  ${(props) =>
    props.size === 'large' &&
    css`
      font-size: 32px;
      line-height: 42px;
    `}
`

export const AsideRight = styled.aside`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr auto;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`
