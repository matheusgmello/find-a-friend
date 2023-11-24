import { AppCard } from '../components/AppCard'
import { RegisterForm } from './components/RegisterForm'

export function Register() {
  return (
    <main className="w-screen h-screen py-20 flex justify-center items-center overflow-x-hidden gap-32 home px-5">
      <AppCard className="max-md:hidden" />
      <div className="h-full w-full max-w-lg home z-50 ">
        <RegisterForm />
      </div>
    </main>
  )
}
