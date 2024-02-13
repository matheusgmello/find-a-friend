type TileLayer = {
  attribution: string
  url: string
}

export const OPEN_STREET_MAP: TileLayer = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}
