/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string
  readonly VITE_GOOGLE_MAPS_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
