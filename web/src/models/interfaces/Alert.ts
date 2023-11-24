export type ActionAlertProps = 'error' | 'warning' | 'success' | 'info'

export interface AlertProps {
  title: string
  description: string
  action: ActionAlertProps
  open?: boolean
  closeAlert?: () => void
}
