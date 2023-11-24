import dogsHome from '../../assets/images/dogsHome.png'
import Logo from '../../assets/icons/logo.svg'
import { Form } from './components/Form'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { OrgContext } from '@/context/OrgContext'

export function Home() {
  const { token } = useContext(OrgContext)
  return (
    <main className="w-screen h-screen bg-red-500 flex justify-center px-5 items-center">
      <div className="max-w-7xl max-h-[572px] max-lg:max-h-none py-10 h-full max-lg:gap-6 flex justify-between max-sm:justify-center items-center flex-col">
        <header className="flex w-full justify-between items-center">
          <div className="flex self-start justify-center items-center max-md:self-center gap-3">
            <img className="h-14" src={Logo} alt="" />
            <h1 className="font-bold text-xl">FindAFriend</h1>
          </div>
          <div className="flex self-start justify-center items-center gap-3 max-md:self-center">
            {!token ? (
              <Link
                to={'/login'}
                className="text-slate-800 font-bold bg-yellow-500 p-2 rounded-lg flex justify-center items-center hover:opacity-80 transition-all"
              >
                Entrar
              </Link>
            ) : (
              <Link
                to={'/admin'}
                className="text-slate-800 font-bold bg-yellow-500 p-2 rounded-lg flex justify-center items-center hover:opacity-80 transition-all"
              >
                Administrar Organização
              </Link>
            )}
          </div>
        </header>
        <section className="flex justify-between max-lg:flex-col items-center max-lg:gap-6 w-full">
          <h1 className="font-extrabold text-7xl max-sm:text-5xl leading-[90%] max-lg:self-start self-end max-w-lg max-lg:max-w-none">
            Leve a felicidade para o seu lar
          </h1>
          <img className="max-w-xl max-sm:hidden" src={dogsHome} alt="Dogs" />
        </section>
        <section className="flex max-lg:flex-col max-lg:gap-6 justify-between items-center w-full">
          <h2 className="text-2xl max-sm:text-xl font-semibold max-lg:max-w-none max-w-sm">
            Encontre o animal de estimação ideal para seu estilo de vida!
          </h2>
          <Form />
        </section>
      </div>
    </main>
  )
}
