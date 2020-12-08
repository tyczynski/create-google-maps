export interface Options {
  container: string | Element
  mapOptions: google.maps.MapOptions
  plugins?: any[]
}

export type ScriptStatus = 'loading' | 'loaded' | 'error'

export type GMap = google.maps.Map
export type Marker = google.maps.Marker
export type MapOptions = google.maps.MapOptions
export type MapLatLngBounds = google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
export type MapPadding = google.maps.Padding
export type MapEventListener = google.maps.MapsEventListener

export type Markers = Marker[]
export type MarkerOptions = Omit<google.maps.ReadonlyMarkerOptions, 'map'>

export interface State {
  mounted: boolean
  centering: 'center' | 'bounds'
  infoWindows: Map<Marker, MapEventListener>
}
