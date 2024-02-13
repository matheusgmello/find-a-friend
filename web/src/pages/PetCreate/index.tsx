import { zodResolver } from '@hookform/resolvers/zod'
import { Gear, Plus } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Alert } from '@/components/Alert'
import {
  ageOptions,
  energyOptions,
  environmentsOptions,
  genderOptions,
  independenceOptions,
  sizeOptions,
  typeOptions,
} from '@/constant/pet-record'
import { InputSelect, InputText, InputTextArea } from '@/components/Input'
import { Sidebar } from '@/components/Sidebar'

import { SquashIcon } from '@/pages/PetProfile/styles'
import {
  AddButton,
  AdoptionRequirementList,
  Button,
  Container,
  FieldsetContainer,
  FormContainer,
  Header,
  ImageList,
  ImageListItem,
  PetCreateContainer,
} from './styles'

import logoImg from '@/assets/icons/logo.svg'
import { InputFile } from '@/components/Input/InputFile'
import { ErrorMessage } from '@/components/Input/styles'
import { useAuthOrg } from '@/contexts/AuthOrgContext'
import { api } from '@/services/http'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5mb
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const createPetSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(300),
  age: z.string().nonempty(),
  size: z.string().nonempty(),
  gender: z.string().nonempty(),
  independence: z.string().nonempty(),
  energy: z.string().nonempty(),
  environment: z.string().nonempty(),
  images: z
    .instanceof(FileList)
    .refine((files) => !!files.item(0), 'A imagem de perfil é obrigatória')
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      `Tamanho máximo de 5MB`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        ),
      'Formato de imagem inválido',
    )
    .transform((files) => {
      return Array.from(files)
    }),
  adoptionRequirements: z
    .array(
      z.object({
        value: z.string().nonempty(),
      }),
    )
    .min(1, 'Pelo menos um requisito de adoção')
    .max(6, 'Máximo de 6 requisitos de adoção'),
  type: z.string().nonempty(),
})

type CreatePetSchema = z.infer<typeof createPetSchema>

function usePreviewImages(files: FileList | File[]) {
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const resetPreviewImages = useCallback(() => {
    setPreviewImages([])
  }, [])

  useEffect(() => {
    if (!files) return
    const previewImages = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    )
    setPreviewImages(previewImages)
  }, [files])

  return { previewImages, resetPreviewImages }
}

export function PetCreate() {
  const [newAdoptionRequirements, setNewAdoptionRequirements] =
    useState<string>('')
  const { org } = useAuthOrg()
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<CreatePetSchema>({
    resolver: zodResolver(createPetSchema),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'adoptionRequirements',
  })
  const { previewImages, resetPreviewImages } = usePreviewImages(
    watch('images'),
  )

  const handleAddNewAdoptionRequirement = useCallback(
    (param: string) => {
      append({ value: param })
      setNewAdoptionRequirements('')
    },
    [append],
  )

  async function handleCreatePet(createPetForm: CreatePetSchema) {
    try {
      const formData = new FormData()
      formData.append('name', createPetForm.name)
      formData.append('age', createPetForm.age)
      formData.append('size', createPetForm.size)
      formData.append('description', createPetForm.description)
      formData.append('energy', createPetForm.energy)
      formData.append('independence', createPetForm.independence)
      formData.append('type', createPetForm.type)
      formData.append(
        'adoptionRequirements',
        JSON.stringify(
          createPetForm.adoptionRequirements.map((item) => item.value),
        ),
      )
      // formData.append('environment', createPetForm.environment)
      createPetForm.images.forEach((image) => {
        formData.append('images', image!)
      })

      await api.post('/pets', formData)
      toast.success('Pet cadastrado com sucesso!')
      resetForm()
    } catch (err) {
      toast.error('Erro ao cadastrar pet')
    }
  }

  function resetForm() {
    reset()
    resetPreviewImages()
    fields.forEach((_, index) => remove(index))
  }

  return (
    <Container>
      <Sidebar />
      <Header>
        <SquashIcon>
          <img src={logoImg} alt="Face cachorro" />
        </SquashIcon>
        <div>
          <h2>{org?.nome}</h2>
          <p>{org?.address}</p>
        </div>
        <button>
          <Gear size={24} weight="bold" />
        </button>
      </Header>
      <PetCreateContainer>
        <h1>Adicione um pet</h1>

        <FormContainer onSubmit={handleSubmit(handleCreatePet)}>
          <InputText
            label="Nome"
            errorMessage={errors.name?.message}
            {...register('name')}
          />
          <InputTextArea
            label="Sobre"
            labelExtraText="Máximo de 300 catacteres"
            rows={4}
            errorMessage={errors.description?.message}
            {...register('description')}
          />
          <InputSelect
            label="Animal"
            options={typeOptions}
            errorMessage={errors.type?.message}
            {...register('type')}
          />
          <InputSelect
            label="Idade"
            options={ageOptions}
            errorMessage={errors.age?.message}
            {...register('age')}
          />
          <InputSelect
            label="Porte do animal"
            options={sizeOptions}
            errorMessage={errors.size?.message}
            {...register('size')}
          />
          <InputSelect
            label="Gênero	"
            options={genderOptions}
            errorMessage={errors.gender?.message}
            {...register('gender')}
          />
          <InputSelect
            label="Nível de independência"
            options={independenceOptions}
            errorMessage={errors.independence?.message}
            {...register('independence')}
          />
          <InputSelect
            label="Nível de energia"
            options={energyOptions}
            errorMessage={errors.energy?.message}
            {...register('energy')}
          />
          <InputSelect
            label="Ambiente"
            options={environmentsOptions}
            errorMessage={errors.environment?.message}
            {...register('environment')}
          />
          <div>
            <InputFile
              label="Fotos"
              type="file"
              accept="image/*"
              multiple
              errorMessage={errors.images?.message}
              {...register('images')}
            />
            <ImageList>
              {previewImages.map((image) => {
                return (
                  <ImageListItem key={image}>
                    <img src={image} alt={`${image}`} />
                  </ImageListItem>
                )
              })}
            </ImageList>
          </div>

          <FieldsetContainer>
            <legend>
              <h2>Requesitos para adoção</h2>
            </legend>
            <div>
              <InputText
                label="Requisito"
                value={newAdoptionRequirements}
                onChange={(e) => setNewAdoptionRequirements(e.target.value)}
              />
              <AddButton
                type="button"
                onClick={() =>
                  handleAddNewAdoptionRequirement(newAdoptionRequirements)
                }
              >
                <Plus size={20} />
              </AddButton>
            </div>

            {/* Requirement list */}
            <div>
              <AdoptionRequirementList>
                {fields.map((field, index) => {
                  return (
                    <Alert
                      key={field.id}
                      text={field.value}
                      showCloseButton
                      onClose={() => remove(index)}
                    />
                  )
                })}
              </AdoptionRequirementList>
              {errors.adoptionRequirements?.message && (
                <ErrorMessage>
                  {errors.adoptionRequirements?.message}
                </ErrorMessage>
              )}
            </div>
          </FieldsetContainer>

          <Button type="submit" disabled={isSubmitting}>
            Confirmar
          </Button>
        </FormContainer>
      </PetCreateContainer>
    </Container>
  )
}
