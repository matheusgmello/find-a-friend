import { ChangeEvent } from 'react'

import logo from '@/assets/icons/logo.svg'
import search from '@/assets/icons/search.svg'
import { Button } from '~/Button'
import { Select } from '~/Select'

import {
  AsideContent,
  AsideHeader,
  Container,
  ContentFilters,
  ContentHeader,
  HeaderInput,
} from './styles'
import { useSearchPets } from '@/contexts/SearchPetsContext'
import {
  ageOptions,
  energyOptions,
  independenceOptions,
  sizeOptions,
} from '@/constant/pet-record'

export function Aside() {
  const { handleSearchFilters, searchFilters } = useSearchPets()

  async function handleSearchPets() {
    handleSearchFilters(searchFilters)
  }

  function handleChangeSearchFilters(
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    const { name: field, value } = e.target
    handleSearchFilters({ [field]: value })
  }

  return (
    <Container>
      <AsideHeader>
        <div>
          <img src={logo} alt="" />
          <HeaderInput>
            <input
              name="city"
              type="text"
              placeholder="Insira uma cidade"
              onChange={(e) => handleChangeSearchFilters(e)}
              value={searchFilters.city}
            />
            <Button onClick={handleSearchPets} disabled={!searchFilters.city}>
              <img src={search} alt="ícone de lupa" />
            </Button>
          </HeaderInput>
        </div>
      </AsideHeader>
      <AsideContent>
        <ContentHeader>Filtros</ContentHeader>
        <ContentFilters>
          <Select
            name="age"
            label="Idade"
            options={ageOptions}
            onChange={(e) => handleChangeSearchFilters(e)}
            value={searchFilters.age}
          />

          <Select
            name="energy"
            label="Nível de energia"
            options={energyOptions}
            onChange={(e) => handleChangeSearchFilters(e)}
            value={searchFilters.energy}
          />

          <Select
            name="size"
            label="Porte do animal"
            options={sizeOptions}
            onChange={(e) => handleChangeSearchFilters(e)}
            value={searchFilters.size}
          />

          <Select
            name="independence"
            label="Nível de independência"
            options={independenceOptions}
            onChange={(e) => handleChangeSearchFilters(e)}
            value={searchFilters.independence}
          />
        </ContentFilters>
      </AsideContent>
    </Container>
  )
}
