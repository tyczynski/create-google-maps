export interface Options {
  container: string | Element
  mapOptions: google.maps.MapOptions
  plugins?: any[]
}

export interface State {
  mounted: boolean
}

export type ScriptStatus = 'loading' | 'loaded' | 'error'

export type Map = google.maps.Map
export type Marker = google.maps.Marker

export type Markers = Marker[]
export type MarkerOptions = Omit<google.maps.ReadonlyMarkerOptions, 'map'>
