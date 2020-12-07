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

// Aliases to types in `google.maps` namespace
export type Map = google.maps.Map
export type MapMarker = google.maps.Marker
export type MapOptions = google.maps.MapOptions
export type MapPadding = google.maps.Padding

export type MapMarkers = MapMarker[]
export type MapLatLngBounds = google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
export type MapMarkerOptions = Omit<google.maps.ReadonlyMarkerOptions, 'map'>
