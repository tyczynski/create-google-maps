import { EventBus } from './lib'
import { getContainer } from './utils'
import { Marker, Map, State, MarkerOptions, Markers, Options } from './types'

export class CreateGoogleMaps {
  public map: Map
  public eb: EventBus
  #options: Options
  #container: Element
  #state: State
  #markers: Markers

  constructor(options: Options) {
    this.map
    this.eb = new EventBus()
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
      mounted: false,
    }

    this.registerPlugins()
    this.mount()
  }

  private mount() {
    this.createMap()
  }

  private registerPlugins() {
    this.#options.plugins.forEach((plugin) => {
      const instance = plugin(this)

      Object.keys(instance.methods).forEach((method) => {
        this[method] = instance.methods[method]
        console.log(this[method])
      })
    })
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
   */
  public createMarker(config: MarkerOptions) {
    const marker = new this.gm.Marker({
      ...config,
      map: this.map,
    })

    this.#markers.push(marker)

    return marker
  }

  /**
   * Removes all markers from map
   *
   * @see {@link https://developers.google.com/maps/documentation/javascript/markers#remove Maps JavaScript API}
   */
  public removeMarkers() {
    this.eb.emit('')

    this.#markers.forEach((_marker) => _marker.setMap(null))
    this.#markers = []
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
