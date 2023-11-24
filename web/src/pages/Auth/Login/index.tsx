import { AppCard } from '../components/AppCard'
import { LoginForm } from './components/LoginForm'

export function Login() {
  return (
    <main className="w-screen h-screen py-20 max-md:py-0 flex justify-center items-center gap-32 max-md:flex-col max-md:gap-5 max-md:relative md:px-5">
      <AppCard />
      <LoginForm />
    </main>
  )
}
