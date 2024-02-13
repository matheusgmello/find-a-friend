import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { SearchFilters } from '@/models/pet'

type SearchPetsContextData = {
  searchFilters: SearchFilters
  handleSearchFilters: (params: Partial<SearchFilters>) => void
}

const SearchPetsContext = createContext({} as SearchPetsContextData)

type SearchPetsContextProviderProps = {
  children: ReactNode
}

export function SearchPetsContextProvider({
  children,
}: SearchPetsContextProviderProps) {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    age: '',
    city: '',
    energy: '',
    size: '',
    independence: '',
    type: 'all',
  })

  const handleSearchFilters = useCallback((params: Partial<SearchFilters>) => {
    setSearchFilters((prevState) => ({ ...prevState, ...params }))
  }, [])

  const value = useMemo(
    () => ({ searchFilters, handleSearchFilters }),
    [searchFilters, handleSearchFilters],
  )
  return (
    <SearchPetsContext.Provider value={value}>
      {children}
    </SearchPetsContext.Provider>
  )
}

export const useSearchPets = () => {
  const context = useContext(SearchPetsContext)
  if (!context) {
    throw new Error(
      'useSearchPetsContext must be used within a SearchPetsContextProvider',
    )
  }
  const { handleSearchFilters, searchFilters } = context
  return { handleSearchFilters, searchFilters }
}
