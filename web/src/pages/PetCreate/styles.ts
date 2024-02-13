import { hexToRgb } from '@/utils/hex-to-rgb'
import styled from 'styled-components'

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
  border: 1px solid ${({ theme }) => theme.colors.text};
  display: grid;
  grid-template-columns: 4rem 1fr 4rem;
  gap: 0.875rem;
  align-items: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem 4.5rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1.125rem;

  p {
    color: ${({ theme }) => theme.colors.gray};
    font-weight: 'semibold';
    font-size: 1.125rem;
    line-height: 28px;
  }

  button {
    color: ${({ theme }) => theme.colors.text};
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 0.875rem;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const PetCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 4.5rem 4.5rem;
  background-color: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

export const FormContainer = styled.form`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const FieldsetContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: none;

  legend {
    width: 100%;
    margin-bottom: 1.875rem;
    padding-bottom: 1.875rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`
export const AdoptionRequirementList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const AdoptionRequirementListItem = styled.li`
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
  }
`

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.875rem 0 0;
  background-color: ${({ theme }) => hexToRgb(theme.colors.danger, 0.1)};
  color: ${({ theme }) => theme.colors.danger};
  border: 1px dashed ${({ theme }) => theme.colors.danger};
  border-radius: 5px;
  width: 100%;
  height: 4rem;
  font-weight: 500;
  cursor: pointer;
`
export const Button = styled.button`
  width: 100%;
  height: 72px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};

  font-size: 20px;
  font-weight: 800;
  text-align: center;
  border-radius: 20px;
  padding: 19px auto;
  border: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
