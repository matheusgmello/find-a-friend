import Logo from '@/assets/icons/logo.svg'
import dogsHome from '@/assets/images/dogsHome.png'

interface AppCardProps {
  className?: string
}

export function AppCard({ className }: AppCardProps) {
  return (
    <div
      className={`h-full max-w-2xl bg-red-500 rounded-3xl p-14 flex flex-col items-center justify-between max-md:absolute max-md:rounded-none ${className}`}
    >
      <header className="w-full flex justify-center items-center gap-3 mt-14">
        <img className="h-14" src={Logo} alt="" />
        <h1 className="font-bold text-xl">FindAFriend</h1>
      </header>
      <img className="w-full" src={dogsHome} alt="Dogs" />
    </div>
  )
}
