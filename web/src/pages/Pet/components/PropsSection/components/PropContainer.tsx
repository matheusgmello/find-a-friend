import { ReactNode } from 'react'

interface PropContainerProps {
  children: ReactNode
  id: string
}
export function PropContainer({ children, id }: PropContainerProps) {
  return (
    <div
      id={id}
      className="flex flex-col justify-center items-start max-md:w-full gap-1 border border-blue-900 border-opacity-20 w-fit rounded-3xl py-4 px-6"
    >
      {children}
    </div>
  )
}
