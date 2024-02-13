import chevron from '@/assets/icons/chevron-bottom.svg'
import { ChangeEvent, ComponentProps } from 'react'

import {
  Filter,
  FilterLabel,
  FilterInput,
  FilterInputOption,
  FilterWrapper,
} from './styles'

type SelectProps = ComponentProps<typeof FilterInput> & {
  label: string
  name: string
  options: {
    value: string | number
    label: string
  }[]
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function Select({ label, name, options, onChange }: SelectProps) {
  return (
    <Filter>
      {label && <FilterLabel htmlFor={name}>{label}</FilterLabel>}
      <FilterWrapper>
        <FilterInput name={name} id={name} onChange={onChange}>
          <FilterInputOption value="">Selecione</FilterInputOption>
          {options.map((option) => {
            return (
              <FilterInputOption key={option.value} value={option.value}>
                {option.label}
              </FilterInputOption>
            )
          })}
        </FilterInput>
        <img src={chevron} alt="" />
      </FilterWrapper>
    </Filter>
  )
}
