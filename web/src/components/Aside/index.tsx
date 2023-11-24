// import { Select } from '@/components/Select'

import logo from '@/assets/icons/logo.svg'
import search from '@/assets/icons/search.svg'
import { Button } from '../Button'
import { SelectComponent } from '../Select'
import { useContext, useEffect, useState } from 'react'
import { LocationContext } from '@/context/LocationContext'

import { UserContext } from '@/context/UserContext'
import { PetContext } from '@/context/PetContext'
import * as Accordion from '@radix-ui/react-accordion'
import { Funnel } from 'phosphor-react'
import { Filter } from './components/Filter'
import { OrgContext } from '@/context/OrgContext'
import { useNavigate } from 'react-router-dom'

export function Aside() {
  const { states, cities, getCitiesByState } = useContext(LocationContext)
  const { registerUserLocation, user } = useContext(UserContext)
  const { isSubmitting } = useContext(PetContext)
  const { token } = useContext(OrgContext)

  const navigate = useNavigate()

  function handleGetCitiesByState(state: string) {
    getCitiesByState(state)
    setState(state)
  }
  const [state, setState] = useState(user.state)
  const [city, setCity] = useState(user.city)
  function handleRegisterUserLocation() {
    registerUserLocation({ state, city })
  }

  useEffect(() => {
    if (user.state && user.state !== state) {
      setState(user.state)
      handleGetCitiesByState(user.state)
    }
    if (user.city && user.city !== city) {
      setCity(user.city)
    }
  }, [user])

  return (
    <aside className="w-96 h-screen sticky max-md:h-fit max-md:w-full max-md:overflow-y-hidden overflow-y-auto bg-red-500">
      <div className=" bg-red-700">
        <div className="pt-20 max-md:py-6 max-md:px-6 px-14 pb-6 flex flex-col gap-6">
          <img className="w-11" src={logo} alt="" />
          <div className="flex flex-col gap-3">
            <SelectComponent
              id="UF"
              name="UF"
              selectLabel="Selecione um estado"
              className="flex justify-between hover:opacity-90 transition-all items-center border border-red-500 bg-transparent font-bold gap-1 py-4 px-10 rounded-2xl"
              options={states}
              value={states.length > 0 && state ? state : undefined}
              onValueChange={(value) => {
                handleGetCitiesByState(value)
              }}
              disabled={!(states.length > 0)}
            />
            <SelectComponent
              className="flex justify-between hover:opacity-90 transition-all gap-2 items-center py-4 bg-red-700 border font-bold w-full border-red-500 px-10 rounded-2xl"
              id="CITY_ID"
              name="Cidade"
              selectLabel="Selecione sua cidade"
              options={cities}
              value={cities.length > 0 && city ? city : undefined}
              disabled={!(cities.length > 0)}
              onValueChange={(value) => {
                setCity(value)
              }}
            />

            <Button
              onClick={handleRegisterUserLocation}
              disabled={!city || !state || isSubmitting}
              className="w-full transition-all bg-yellow-500"
            >
              <img className="w-6" src={search} alt="ícone de lupa" />
            </Button>

            {token && (
              <Button
                onClick={() => navigate('/admin')}
                className="w-full transition-all bg-blue-900 font-bold"
              >
                Administrar organização
              </Button>
            )}
          </div>
        </div>
      </div>
      <Accordion.Root className="hidden max-sm:block" type="multiple">
        <Accordion.Item value="filter">
          <Accordion.Header>
            <Accordion.Trigger className="flex justify-center focus:shadow-none items-center w-full gap-3 text-2xl font-bold py-2 hover:opacity-80 transition-all">
              Filtro <Funnel size={24} weight="fill" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[state='open']:animate-open-accordion transition-all data-[state='closed']:animate-close-accordion overflow-hidden">
            <Filter className="py-4" isMobile />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Filter className="max-sm:hidden" />
    </aside>
  )
}
