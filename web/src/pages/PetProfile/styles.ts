import styled from 'styled-components'

import { hexToRgb } from '@/utils/hex-to-rgb'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2.5rem 1rem 4rem 7rem;

  @media (max-width: 768px) {
    padding-left: calc(1rem + 3rem);
    padding-right: 1rem;
  }
`

export const Content = styled.div``

export const Header = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;

  p {
    color: ${({ theme }) => theme.colors.gray};
    font-weight: 'semibold';
    font-size: 1.125rem;
    line-height: 28px;
  }
`

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 4.5rem;
  background-color: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`
export const SectionPet = styled.section`
  margin-top: 70px;

  h1 {
    font-weight: 800;
    font-size: 3.375rem;
    line-height: 90%;
    letter-spacing: -0.02em;
    margin-bottom: 0.5em;
  }

  p {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 28px;
    margin-bottom: 0.5em;
  }
`

export const MapOrgContainer = styled.div`
  margin-top: 64px;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  background-color: ${({ theme }) => theme.colors.secondary};

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;

  .leaflet-container {
    border-radius: 20px;
  }

  footer {
    padding: 20px 0;
    text-align: center;
    grid-row-end: 3;

    a {
      color: ${({ theme }) => theme.colors.tertiary};
      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
    }
  }
`

export const CharacteristicsList = styled.ul`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
`

export const SectionImages = styled.section``

export const ImageList = styled.ul`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1rem;
`

export const ImageListItem = styled.li`
  list-style: none;
  border-radius: 15px;
  overflow: hidden;

  img {
    max-width: 100%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1/1;
    opacity: 0.3;
    transition: opacity 300ms;

    &:hover,
    &.active {
      opacity: 1;
      cursor: pointer;
    }
  }
`

export const Banner = styled.div`
  margin-top: -1.5rem;
  margin-left: -4.5rem;
  margin-right: -4.5rem;
  height: 336px;
  background-color: ${({ theme }) => theme.colors.bgCard};

  img {
    width: 100%;
    height: 336px;
    object-fit: cover;
    object-position: center;
  }
`

export const SectionContact = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 40px;
  padding-top: 55px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;

  h2 {
    font-weight: 700;
    font-size: 2rem;
    line-height: 90%;
    letter-spacing: -0.02em;
  }

  p {
    font-weight: 600;
    font-size: 1rem;
    line-height: 28px;
  }

  .contact-info {
    grid-column-start: 2;
  }

  @media (max-width: 768px) {
    .contact-info {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`

export const SquashIcon = styled.div`
  width: 64px;
  height: 64px;
  width: 48px;
  height: 48px;
  background-color: #f27006;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  img {
    width: 20px;
    height: 20px;
  }
`

export const SectionRequirement = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 55px;
  padding-top: 55px;
  header {
    h2 {
      font-weight: 700;
      font-size: 2rem;
      line-height: 90%;
      letter-spacing: -0.02em;
    }
  }
`

export const RequirementList = styled.ul`
  margin-top: 2.5rem;
  display: grid;
  gap: 1rem;
`

export const RequirementListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 40px;
  color: ${({ theme }) => theme.colors.danger};
  border: 1px solid currentColor;
  border-radius: 15px;
  background-image: ${() =>
    `linear-gradient(90deg, ${hexToRgb('#F75F60', 0.1)}, ${hexToRgb(
      '#F15156',
      0,
    )})`};

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`

export const FooterActions = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 50px;
  padding-top: 50px;
`
