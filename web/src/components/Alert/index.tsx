import { AlertProps } from '@/models/interfaces/Alert'
import * as Toast from '@radix-ui/react-toast'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'

export function Alert({
  description,
  title,
  action,
  open,
  closeAlert,
}: AlertProps) {
  const [classAction, setClassAction] = useState('')
  useEffect(() => {
    switch (action) {
      case 'error':
        setClassAction('bg-red-500 text-white')
        break
      case 'success':
        setClassAction('bg-green-500 text-white')
        break
      case 'warning':
        setClassAction('bg-yellow-500 text-blue-900')
        break

      default:
        setClassAction('bg-blue-700 text-white')
        break
    }
  }, [action])

  function handleCloseAlert() {
    closeAlert()
  }

  return (
    <Toast.Provider swipeDirection="down" swipeThreshold={200}>
      <Toast.Root
        onClick={handleCloseAlert}
        open={open}
        className={`fixed bottom-5 right-5 ${classAction} border-2 border-black flex flex-col justify-center items-start max-w-xs py-2 px-10 transition-all rounded-2xl 
        data-[state=open]:animate-open-alert 
        data-[state=closed]:animate-close-alert 
        data-[swipe=move]:translate-x-{var(--radix-toast-swipe-move-x)} 
        data-[swipe=cancel]:translate-x-0 
        data-[swipe=cancel]:duration-200 
        data-[swipe=cancel]:transition-all`}
      >
        <Toast.Title className="font-bold text-xl ">{title}</Toast.Title>
        <Toast.Description className="text-sm">{description}</Toast.Description>
        <Toast.Close
          onClick={handleCloseAlert}
          asChild
          className="absolute top-2 right-2 cursor-pointer "
        >
          <X size={24} />
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport />
    </Toast.Provider>
  )
}
