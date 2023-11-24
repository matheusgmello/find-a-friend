import Logo from '@/assets/icons/logo.svg'
import { Button } from '@/components/Button'
import { OrgContext } from '@/context/OrgContext'
import { SignOut } from 'phosphor-react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export function OrgCard() {
  const { onSignOut, org } = useContext(OrgContext)
  const navigate = useNavigate()
  function handleSignOut() {
    onSignOut()
    navigate('/')
  }

  return (
    <section className="flex justify-between w-full py-8 px-20 bg-blue-900 rounded-3xl gap-4 max-md:flex-col max-md:px-10 ">
      <img
        className="bg-orange-600 max-w-[64] max-h-16 rounded-2xl p-4"
        src={Logo}
        alt=""
      />
      <div className="flex flex-1 flex-col justify-center items-start font-Nunito">
        <h1 className="text-3xl font-bold">{org.nome}</h1>
        <p className="font-semibold text-base">{org.address}</p>
      </div>
      <Button onClick={handleSignOut} className="bg-blue-800 px-5">
        <SignOut weight="bold" size={24} />
      </Button>
    </section>
  )
}
