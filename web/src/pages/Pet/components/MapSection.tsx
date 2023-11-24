import { Coordinates } from '@/models/interfaces/Location'
import { Map } from '@/components/Map'

interface MapSectionProps {
  coords: Coordinates
}

export function MapSection({ coords }: MapSectionProps) {
  return (
    <section className="bg-blue-900 flex flex-col justify-center items-center rounded-2xl mt-20">
      {coords.latitude && (
        <>
          <Map coords={coords} />
          <a
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`}
            className="font-bold text-lg text-yellow-500 my-5 cursor-pointer"
            rel="noreferrer"
          >
            Ver rotas no Google Maps
          </a>
        </>
      )}
    </section>
  )
}
