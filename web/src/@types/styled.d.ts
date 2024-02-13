import { theme } from '@/styles/global'

type AppTheme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
