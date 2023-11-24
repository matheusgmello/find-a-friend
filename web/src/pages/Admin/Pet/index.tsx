import { PetAside } from '@/components/PetAside'
import { OrgCard } from '../components/OrgCard'
import { Form } from './components/Form'

export function AdminPet() {
  return (
    <main className="flex max-md:flex-col bg-red-100">
      <PetAside />
      <section className="flex-1  flex flex-col items-center overflow-y-auto h-screen py-10 home">
        <div className="flex flex-col w-full max-w-3xl gap-7 max-md:px-5">
          <OrgCard />
          <Form />
        </div>
      </section>
    </main>
  )
}
