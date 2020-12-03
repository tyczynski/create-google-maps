import CreateGoogleMaps from '..'
import { Marker, Markers } from '../types'

/**
 * CreateGoogleMaps InfoWindow plugin
 *
 * @see {@link https://developers.google.com/maps/documentation/javascript/infowindows}
 * @param cgm
 */
export default function InfoWindow(cgm: CreateGoogleMaps) {
  const state = new Map<Marker, google.maps.MapsEventListener>()

  const removeInfoWindow = (marker: Marker) => {
    const handler = state.get(marker)
    handler.remove()
    state.delete(marker)
  }

  cgm.eb.on('removeMarker:before', removeInfoWindow)
  cgm.eb.on('removeMarkers:before', (markers: Markers) =>
    markers.forEach((marker) => removeInfoWindow(marker))
  )

  return {
    methods: {
      removeInfoWindow,
      createInfoWindow: (marker: Marker, config: google.maps.InfoWindowOptions) => {
        const infoWindow = new cgm.gm.InfoWindow(config)
        let open = false

        console.log(marker, config)

        const removeListener = marker.addListener('click', () => {
          if (open) {
            infoWindow.close()
          } else {
            infoWindow.open(cgm.map, marker)
          }

          open = !open
        })

        state.set(marker, removeListener)
      },
    },
  }
}
