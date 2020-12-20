import { getContainer } from './utils'
import {
  Marker,
  GMap,
  MapOptions,
  MapLatLngBounds,
  MapPadding,
  State,
  MarkerOptions,
  Markers,
  Options,
  InfoWindowOptions,
} from './types'

export class CreateGoogleMaps {
  public map: GMap
  #options: Options
  #container: Element
  #state: State
  #markers: Markers

  constructor(options: Options) {
    this.map
    this.#options = Object.assign(
      {
        plugins: [],
      },
      options
    )
    this.#container = getContainer(options.container)
    this.#markers = []

    if (!(this.#container instanceof Element)) {
      throw Error('`container` should be instance of `Element`')
    }

    this.#state = {
      infoWindows: new Map<Marker, google.maps.MapsEventListener>(),
      mounted: false,
      centering: 'center',
    }

    this.createMap()
  }

  /**
   * Creates instance of Google Map. Method should be call only once.
   */
  private createMap() {
    this.map = new this.gm.Map(this.#container, this.#options.mapOptions)
    this.#state.mounted = true
  }

  /**
   * Create new marker.
   * `map` option is added by class
   *
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/marker#Marker.constructor Maps JavaScript API}
   * @param config
   * @returns - marker instance
   */
  public createMarker(config: MarkerOptions) {
    const marker = new this.gm.Marker({
      ...config,
      map: this.map,
    })

    this.#markers.push(marker)

    if (this.#state.centering === 'bounds') {
      this.fitBounds(this.map.getBounds().extend(marker.getPosition()))
    }

    return marker
  }

  /**
   * Removes all markers from the map
   *
   * @see {@link https://developers.google.com/maps/documentation/javascript/markers#remove Maps JavaScript API}
   */
  public removeMarkers() {
    this.#markers.forEach((_marker) => _marker.setMap(null))
    this.#markers = []

    if (this.#state.centering === 'bounds') {
      this.fitBounds()
    }
  }

  /**
   * Removes marker passed in `marker` parameter
   *
   * @see {@link https://developers.google.com/maps/documentation/javascript/markers#remove Maps JavaScript API}
   * @param marker
   */
  public removeMarker(marker: Marker) {
    this.#markers = this.#markers.filter((_marker) => {
      const equals = _marker === marker

      if (equals) {
        marker.setMap(null)
      }

      return !equals
    })

    if (this.#state.centering === 'bounds') {
      this.fitBounds()
    }
  }

  /**
   * Sets the viewport to contain the given bounds.
   * If the `bounds` is falsy, the bounds will fit to current markers' position.
   *
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/map#Map.fitBounds Maps JavaScript API}
   * @param bounds
   */
  public fitBounds(bounds?: MapLatLngBounds, padding?: MapPadding) {
    if (bounds) {
      this.map.fitBounds(bounds, padding)
    } else {
      let _bounds = new this.gm.LatLngBounds()

      // Set bounds based on current markers
      this.#markers.forEach((marker) => {
        _bounds.extend(marker.getPosition())
      })

      this.map.fitBounds(_bounds, padding)
    }

    this.#state.centering = 'bounds'
  }

  /**
   * Remove bounds and set default position and zoom from options
   *
   * @param options - new default values for map instance
   */
  public removeBounds(
    options: {
      center?: MapOptions['center']
      zoom?: MapOptions['zoom']
    } = {}
  ) {
    const zoom = options.zoom || this.#options.mapOptions.zoom
    const center = options.center || this.#options.mapOptions.center

    this.map.setCenter(center)
    this.map.setZoom(zoom)
    this.#state.centering = 'center'
  }

  /**
   * Creates an info window with the given options.
   *
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow.constructor Maps JavaScript API}
   * @param marker
   * @param config
   */
  createInfoWindow(marker: Marker, config: InfoWindowOptions) {
    const infoWindow = new this.gm.InfoWindow(config)
    let open = false

    const removeListener = marker.addListener('click', () => {
      if (open) {
        infoWindow.close()
      } else {
        infoWindow.open(this.map, marker)
      }

      open = !open
    })

    this.#state.infoWindows.set(marker, removeListener)
  }

  /**
   * Remove InfoWindow from passed marker
   *
   * @see {@link https://developers.google.com/maps/documentation/javascript/infowindows}
   * @param marker
   */
  removeInfoWindow(marker: Marker) {
    const handler = this.#state.infoWindows.get(marker)

    if (handler) {
      handler.remove()
      this.#state.infoWindows.delete(marker)
    }
  }

  /**
   * Returns read-only instance of state
   */
  public get state() {
    return Object.freeze(this.#state)
  }

  /**
   * Abbreviation to google.maps method
   *
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference Maps JavaScript API}
   */
  public get gm() {
    return google.maps
  }
}
