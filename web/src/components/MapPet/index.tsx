import Leaflet from 'leaflet'
import { CSSProperties, ReactNode } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import mapMarker from '@/assets/icons/map-marker.svg'
import { OPEN_STREET_MAP } from '@/constant/tile-layers'
import { Coordinates } from '@/models/location'

import { MapOrgContainer } from './styles'

const MapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [64, 72],
  iconAnchor: [32, 72],
  popupAnchor: [0, -72],
})

interface MapPetProps {
  coordinates: Coordinates
  popupText: string
  children?: ReactNode
  containerStyle?: CSSProperties
}

export function MapPet({
  coordinates,
  popupText,
  children,
  containerStyle = {},
}: MapPetProps) {
  const shouldShowMap = coordinates?.latitude && coordinates?.longitude
  return (
    <>
      {shouldShowMap ? (
        <>
          <MapOrgContainer style={containerStyle}>
            <MapContainer
              center={[coordinates?.latitude, coordinates?.longitude]}
              zoom={13}
              minZoom={11}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution={OPEN_STREET_MAP.attribution}
                url={OPEN_STREET_MAP.url}
              />
              <Marker
                icon={MapIcon}
                position={[coordinates?.latitude, coordinates?.longitude]}
              >
                <Popup>{popupText}</Popup>
              </Marker>
            </MapContainer>
          </MapOrgContainer>
          {children}
        </>
      ) : null}
    </>
  )
}
