// import { SelectComponent } from '@/components/Select'
import {
  ageOptions,
  energyOptions,
  environmentOptions,
  independencyOptions,
  petOptions,
  sizeOptions,
} from '@/utils/petsOptions'
import { ImagesInput } from './ImagesInput'
import { RequirementSection } from './RequirementSection'
import { Button } from '@/components/Button'
import { InputForm } from '@/components/InputForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { SelectComponent } from './SelectComponent'
import { api } from '@/lib/axios'
import { OrgContext } from '@/context/OrgContext'
import { isAxiosError } from 'axios'
import { AlertContext } from '@/context/AlertContext'
import { PetFormData, petFormSchemaValidator } from '@/validator/admin/PetForm'

export function Form() {
  const [requirements, setRequirements] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])

  const { alertDispatch } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PetFormData>({
    values: {
      images,
      adoptionRequirements: JSON.stringify(requirements),
    },
    resolver: zodResolver(petFormSchemaValidator),
  })

  const { token } = useContext(OrgContext)

  async function onSubmit({
    adoptionRequirements,
    age,
    description,
    energy,
    images,
    independence,
    name,
    size,
    type,
    environment,
  }: PetFormData) {
    const formData = new FormData()

    formData.set('age', age)
    formData.set('description', description)
    formData.set('adoptionRequirements', adoptionRequirements)
    formData.set('energy', energy)
    formData.set('independence', independence)
    formData.set('name', name)
    formData.set('size', size)
    formData.set('type', type)
    formData.set('environment', environment)
    images.forEach((image) => {
      formData.append('images', image, image.name)
    })

    try {
      const { status } = await api.post('/pets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      if (status === 201) {
        alertDispatch({
          action: 'success',
          title: 'Sucesso',
          description: 'Cadastrar PET',
        })
        reset()
        setImages([])
        setRequirements([])
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alertDispatch({
          action: 'error',
          title: 'erro',
          description: 'Cadastrar PET',
        })
      }
      console.log('Post pet', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full max-w-3xl bg-white border border-blue-50 rounded-3xl py-16 px-20 max-md:px-5"
    >
      <h1 className="text-blue-900 font-extrabold text-4xl">Adicione um pet</h1>
      <hr />
      <InputForm
        {...register('name')}
        label="Nome"
        errorMessage={errors.name?.message}
      />
      <div className="flex flex-col gap-2 select-none">
        <label
          htmlFor="Sobre"
          className="flex gap-6 items-center font-semibold text-blue-900"
        >
          Sobre
          <span className="text-xs text-blue-100">
            Máximo de 300 catacteres
          </span>
        </label>
        <textarea
          {...register('description')}
          id={'Sobre'}
          rows={5}
          className="bg-blue-10 text-blue-900 border border-blue-50 p-4 w-full rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold"
        ></textarea>
        {errors.description?.message && (
          <p className="font-semibold text-red-400 ">
            {errors.description.message}
          </p>
        )}
      </div>

      <SelectComponent
        {...register('type')}
        labelClassName="font-semibold text-blue-900 text-base"
        selectLabel="Tipo"
        label="Tipo"
        options={petOptions.slice(1)}
        id="age"
        name="Tipo"
        defaultValue={petOptions[1].value}
        className="flex justify-between items-center bg-blue-10 text-blue-900 border border-blue-50 p-4 w-full rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold"
      />
      {errors.type?.message && (
        <p className="font-semibold text-red-400 ">{errors.type.message}</p>
      )}
      <SelectComponent
        {...register('age')}
        labelClassName="font-semibold text-blue-900 text-base"
        selectLabel="Idade"
        label="Idade"
        options={ageOptions.slice(1)}
        id="age"
        name="Idade"
        defaultValue={ageOptions[1].value}
        className="flex justify-between items-center bg-blue-10 text-blue-900 border border-blue-50 p-4 w-full rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold"
      />
      {errors.age?.message && (
        <p className="font-semibold text-red-400 ">{errors.age.message}</p>
      )}
      <SelectComponent
        {...register('size')}
        labelClassName="font-semibold text-blue-900 text-base"
        selectLabel="Porte"
        label="Porte"
        options={sizeOptions.slice(1)}
        id="size"
        name="Porte"
        defaultValue={sizeOptions[1].value}
        className="flex justify-between items-center bg-blue-10 text-blue-900 border border-blue-50 p-4 w-full rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold"
      />
      {errors.size?.message && (
        <p className="font-semibold text-red-400 ">{errors.size.message}</p>
      )}
      <SelectComponent
        {...register('energy')}
        labelClassName="font-semibold text-blue-900 text-base"
        selectLabel="Nível de energia"
        label="Nível de energia"
        options={energyOptions.slice(1)}
        id="energy"
        name="Nível de energia"
        defaultValue={String(energyOptions[1].value)}
        className="flex justify-between items-center bg-blue-10 text-blue-900 border border-blue-50 p-4 w-full rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold"
      />
      {errors.energy?.message && (
        <p className="font-semibold text-red-400 ">{errors.energy.message}</p>
      )}
      <SelectComponent
        {...register('independence')}
        labelClassName="font-semibold text-blue-900 text-base"
        selectLabel="Nível de independência"
        label="Nível de independência"
        options={independencyOptions.slice(1)}
        id="independency"
        name="Nível de independência"
        defaultValue={independencyOptions[1].value}
        className="flex justify-between items-center bg-blue-10 text-blue-900 border border-blue-50 p-4 w-full rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold"
      />
      {errors.independence?.message && (
        <p className="font-semibold text-red-400 ">
          {errors.independence.message}
        </p>
      )}
      <SelectComponent
        {...register('environment')}
        labelClassName="font-semibold text-blue-900 text-base"
        selectLabel="Ambiente"
        label="Ambiente"
        options={environmentOptions}
        id="independency"
        name="Ambiente"
        defaultValue={environmentOptions[0].value}
        className="flex justify-between items-center bg-blue-10 text-blue-900 border border-blue-50 p-4 w-full rounded-xl placeholder:text-opacity-50 placeholder:text-blue-900 text-lg font-semibold"
      />
      <ImagesInput
        errorMessage={errors.images?.message}
        images={images}
        setImages={setImages}
      />

      <RequirementSection
        requirements={requirements}
        setRequirements={setRequirements}
        errorMessage={errors.adoptionRequirements?.message}
      />
      <Button
        disabled={isSubmitting}
        className="bg-yellow-500 text-blue-900 text-lg font-extrabold py-5 mt-5"
        type="submit"
      >
        Confirmar
      </Button>
    </form>
  )
}
