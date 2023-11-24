import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
}
export function Button({ children, className, type, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={` p-3 rounded-2xl flex justify-center transition-all items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:brightness-100 hover:brightness-90 ${className} `}
      type={type}
    >
      {children}
    </button>
  )
}
