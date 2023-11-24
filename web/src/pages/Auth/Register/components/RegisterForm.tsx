import { Button } from '@/components/Button'
import { InputForm } from '../../../../components/InputForm'
import { Link } from 'react-router-dom'
import { Map } from '@/components/Map'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Coordinates } from '@/models/interfaces/Location'
import {
  RegisterOrgFormData,
  registerFormSchemaValidator,
} from '@/validator/auth/RegisterOrg'
import { OrgContext } from '@/context/OrgContext'

export function RegisterForm() {
  const { onRegisterOrg } = useContext(OrgContext)

  const [zip, setZip] = useState('')
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({} as Coordinates)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterOrgFormData>({
    values: {
      address,
    },
    resolver: zodResolver(registerFormSchemaValidator),
  })

  const regex = /^[0-9]{8}$/

  async function getCoordinatesByZip(zip: string) {
    if (regex.test(zip)) {
      const { data } = await api.get(`/location/coordinates/${zip}`)
      setAddress(data.address)

      setCoordinates(data.coordinates)
    }
  }

  useEffect(() => {
    getCoordinatesByZip(zip)
  }, [zip])

  async function onSubmit(data: RegisterOrgFormData) {
    onRegisterOrg(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col py-10 gap-16 text-blue-900 max-md:px-5 max-md:py-5"
    >
      <h1 className="text-6xl font-bold w-full text-center max-md:text-4xl">
        Cadastre sua organização
      </h1>
      <div className="flex flex-col gap-4">
        <InputForm
          {...register('name')}
          label="Nome do responsável"
          placeholder="Fulano de tal"
          errorMessage={errors.name?.message}
        />
        <InputForm
          {...register('email')}
          label="Email"
          placeholder="nome@email.com"
          type="email"
          errorMessage={errors.email?.message}
        />
        <InputForm
          {...register('zip')}
          label="CEP"
          placeholder="13254000"
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setZip(event.target.value)
          }}
          value={zip}
          errorMessage={errors.zip?.message}
        />
        <InputForm
          {...register('address')}
          label="Endereço"
          placeholder="Rua do meio"
          type="text"
          errorMessage={errors.address?.message}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setAddress(event.target.value)
          }}
          value={address}
        />
        <div className="border-2 border-dashed border-blue-900 rounded-2xl border-opacity-50">
          {coordinates.latitude ? (
            <Map
              coords={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
            />
          ) : (
            <div
              className="flex justify-center items-center text-opacity-80 font-semibold select-none text-blue-900 max-md:text-center"
              style={{
                width: '100%',
                height: 225,
                borderRadius: '1rem',
              }}
            >
              {regex.test(zip)
                ? 'Não foi possível carregar o mapa'
                : 'Insira o CEP para carregar sua localização'}
            </div>
          )}
        </div>
        <InputForm
          {...register('phone')}
          label="Whatsapp"
          placeholder="48991256373"
          type="text"
          errorMessage={errors.phone?.message}
        />
        <InputForm
          {...register('password')}
          label="Senha"
          placeholder="*********"
          type="password"
          errorMessage={errors.password?.message}
        />
        <InputForm
          {...register('passwordConfirm')}
          label="Confirmar Senha"
          placeholder="*********"
          type="password"
          errorMessage={errors.passwordConfirm?.message}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          className="py-5  text-white font-extrabold text-xl bg-blue-900"
          disabled={isSubmitting}
        >
          Cadastrar
        </Button>
        <Link
          to={'/login'}
          type="button"
          className="py-5 flex justify-center items-center rounded-xl text-blue-900 font-extrabold text-xl underline"
        >
          Já possui conta?
        </Link>
      </div>
    </form>
  )
}
