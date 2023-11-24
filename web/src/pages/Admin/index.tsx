import { PetAside } from '@/components/PetAside'
import { OrgContext } from '@/context/OrgContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '@/assets/icons/logo.svg'
import { Plus } from 'phosphor-react'
import { OrgCard } from './components/OrgCard'
export function Admin() {
  const { token } = useContext(OrgContext)

  if (!token) {
    return (
      <main className="flex flex-col w-screen h-screen justify-center items-center">
        <h1 className="font-extrabold text-6xl text-black">Sem autorização</h1>
      </main>
    )
  }
  return (
    <main className="flex max-md:flex-col gap-10 bg-red-100">
      <PetAside />
      <section className="w-full flex flex-col items-center justify-start py-10">
        <h1 className="text-lg font-semibold text-blue-100">
          Administrar sua organização
        </h1>
        <div className="max-w-3xl w-full px-8">
          <OrgCard />
        </div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10">
          <Link
            className="flex justify-center items-center p-10 font-extrabold text-2xl rounded-3xl bg-red-500 h-fit mt-10 gap-5 hover:opacity-70 transition-all"
            to={'/admin/pet'}
          >
            <img src={Logo} alt="" />
            Cadastrar novo PET
          </Link>
          <Link
            className="flex justify-center items-center p-10 font-extrabold text-2xl rounded-3xl bg-red-500 h-fit mt-10 gap-5 hover:opacity-70 transition-all"
            to={'/map'}
          >
            <img src={Logo} alt="" />
            Ver PETS
          </Link>
          <button
            disabled
            className="flex justify-center items-center p-10 font-extrabold text-2xl rounded-3xl bg-red-500 mt-10 gap-5 transition-all cursor-not-allowed"
          >
            <Plus weight="bold" size={36} />
            Em breve
          </button>
        </div>
      </section>
    </main>
  )
}
