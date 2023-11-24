import { Alert } from '@/components/Alert'
import { ActionAlertProps, AlertProps } from '@/models/interfaces/Alert'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface AlertContextProviderProps {
  children: ReactNode
}

interface AlertContextProps {
  alertDispatch: ({ action, description, open }: AlertProps) => void
}

export const AlertContext = createContext({} as AlertContextProps)

export function AlertContextProvider({ children }: AlertContextProviderProps) {
  const [action, setAction] = useState<ActionAlertProps>('info')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)

  function alertDispatch({ action, description, title }: AlertProps) {
    setAction(action)
    setDescription(description)
    setTitle(title)

    setOpen(true)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false)
    }, 4000)
    return () => clearTimeout(timeout)
  }, [open])

  function closeAlert() {
    setOpen(false)
  }

  return (
    <AlertContext.Provider
      value={{
        alertDispatch,
      }}
    >
      {children}
      <Alert
        closeAlert={closeAlert}
        open={open}
        title={title}
        description={description}
        action={action}
      />
    </AlertContext.Provider>
  )
}
