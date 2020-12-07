export interface Options {
  container: string | Element
  mapOptions: google.maps.MapOptions
  plugins?: any[]
}

export interface State {
  mounted: boolean
  centering: 'center' | 'bounds'
}

export type ScriptStatus = 'loading' | 'loaded' | 'error'

export type Map = google.maps.Map
export type Marker = google.maps.Marker
export type MapOptions = google.maps.MapOptions
export type MapLatLngBounds = google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
export type MapPadding = google.maps.Padding

export type Markers = Marker[]
export type MarkerOptions = Omit<google.maps.ReadonlyMarkerOptions, 'map'>
