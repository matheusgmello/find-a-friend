import { ChangeEvent, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import chevron from '@/assets/icons/chevron-bottom-blue.svg'
import { useSearchPets } from '@/contexts/SearchPetsContext'
import { useFetchPets } from '@/hooks/use-pet'
import { PetTypeSearchOptions, SearchFilters } from '@/models/pet'
import { Aside } from '~/Aside'
import { Card } from '~/Card'

import {
  Container,
  Content,
  Display,
  Header,
  HeaderSelect,
  SelectWrapper,
} from './styles'

const INITIAL_SEARCH_FILTERS: SearchFilters = {
  age: '',
  city: '',
  energy: '',
  independence: '',
  size: '',
  type: 'all',
}

function getQueryParams(search: string) {
  const searchParams = new URLSearchParams(search)
  const city = searchParams.get('city') || ''
  return { city }
}

export function Map() {
  const { search } = useLocation()
  const city = getQueryParams(search).city || 'Rio De Janeiro'
  const { handleSearchFilters, searchFilters } = useSearchPets()
  const pets = useFetchPets(searchFilters)

  useEffect(() => {
    handleSearchFilters({
      ...INITIAL_SEARCH_FILTERS,
      city,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleFilterByPetType(e: ChangeEvent<HTMLSelectElement>) {
    const type = e.target.value as PetTypeSearchOptions
    handleSearchFilters({ type })
  }

  return (
    <Container>
      <Aside />

      <Content>
        <Header>
          <p>
            Encontre <span>{pets.length} amigos</span> na sua cidade
          </p>
          <SelectWrapper>
            <HeaderSelect
              id="type"
              name="type"
              onChange={handleFilterByPetType}
              value={searchFilters.type}
            >
              <option value="all">Gatos e Cachorros</option>
              <option value="cat">Gatos</option>
              <option value="dog">Cachorros</option>
            </HeaderSelect>
            <img src={chevron} alt="" />
          </SelectWrapper>
        </Header>
        <Display>
          {pets.map((pet) => (
            <Link key={pet.id} to={`/pet-profile/${pet.id}`}>
              <Card path={pet.photo_url} type={pet.type} name={pet.name} />
            </Link>
          ))}
        </Display>
      </Content>
    </Container>
  )
}
