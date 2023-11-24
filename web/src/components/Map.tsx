import { MarkerF, GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Marker from '@/assets/icons/marker.svg'
import { Coordinates } from '@/models/interfaces/Location'
import { Spinner } from './Spinner'
import { useEffect, useState } from 'react'

interface MapProps {
  coords: Coordinates
}
export function Map({ coords }: MapProps) {
  const [latitude, setLatitude] = useState(-27.445166150794126)
  const [longitude, setLongitude] = useState(-48.40008290258068)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  })

  useEffect(() => {
    setLatitude(Number(coords.latitude))
    setLongitude(Number(coords.longitude))
  }, [coords.latitude, coords.longitude, coords])

  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: 225,
          borderRadius: '1rem',
        }}
        center={{
          lat: latitude,
          lng: longitude,
        }}
        zoom={15}
        options={{
          streetViewControl: false,
          panControl: false,
          fullscreenControl: false,
          zoomControl: false,
          mapTypeControl: false,
        }}
      >
        <MarkerF
          position={{
            lat: latitude,
            lng: longitude,
          }}
          icon={Marker}
        />
      </GoogleMap>
    )
  }
  return <Spinner className="w-20 h-20 my-10 text-white fill-red-700" />
}
