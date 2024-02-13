type LabelValueType = {
  label: string
  valueAsNumber: number
}

export const energyRecord: Record<number, LabelValueType> = {
  1: { label: 'Muito baixa', valueAsNumber: 1 },
  2: { label: 'Baixa', valueAsNumber: 2 },
  3: { label: 'Média', valueAsNumber: 3 },
  4: { label: 'Alta', valueAsNumber: 4 },
  5: { label: 'Muito alta', valueAsNumber: 5 },
}

export const sizeRecord: Record<string, LabelValueType> = {
  small: {
    label: 'Pequenino',
    valueAsNumber: 1,
  },
  medium: {
    label: 'Médio',
    valueAsNumber: 2,
  },
  big: {
    label: 'Grande',
    valueAsNumber: 3,
  },
}

export const ageOptions = [
  {
    label: 'Filhote',
    value: 'cub',
  },
  {
    label: 'Adolescente',
    value: 'adolescent',
  },
  {
    label: 'Idoso',
    value: 'elderly',
  },
]
export const energyOptions = [
  {
    label: 'Muito baixa',
    value: 1,
  },
  {
    label: 'Baixa',
    value: 2,
  },
  {
    label: 'Média',
    value: 3,
  },
  {
    label: 'Alta',
    value: 4,
  },
  {
    label: 'Muito alta',
    value: 5,
  },
]
export const sizeOptions = [
  {
    label: 'Pequenino',
    value: 'small',
  },
  {
    label: 'Médio',
    value: 'medium',
  },
  {
    label: 'Grande',
    value: 'big',
  },
]

export const independenceOptions = [
  {
    label: 'Baixo',
    value: 'low',
  },
  {
    label: 'Médio',
    value: 'medium',
  },
  {
    label: 'Alto',
    value: 'high',
  },
]

export const genderOptions = [
  {
    label: 'Masculino',
    value: 'male',
  },
  {
    label: 'Feminino',
    value: 'female',
  },
]

export const environmentsOptions = [
  {
    label: 'Ambiente amplo',
    value: 'spacious',
  },
  {
    label: 'Ambiente externo',
    value: 'outdoor',
  },
  {
    label: 'Ambiente interno',
    value: 'indoor',
  },
]

export const typeOptions = [
  { value: 'dog', label: 'Cachorro' },
  { value: 'cat', label: 'Gato' },
]
