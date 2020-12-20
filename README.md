# Create Google Maps

Library for declarative creation of Google Maps

**Work in progress. The API can be changed. You use it at your own risk.**

## API

Soon. If you want to use this library now, have a look at the code. It is not complicated

### `createMarker`

``` typescript
createMarker: (config: MarkerOptions) => Marker
```

`config` contains [defaults marker options](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) without `map` property because is is passed by class. Returns instance of [`Marker`](https://developers.google.com/maps/documentation/javascript/reference/marker)

### `removeMarkers`

``` typescript
removeMarkers: () => void
```

Removes all markers from the map

### `removeMarker`

``` typescript
removeMarker: (marker: Marker) => void
```

Removes passed [`marker`](https://developers.google.com/maps/documentation/javascript/reference/marker) from map.

### `fitBounds`

``` typescript
fitBounds: (bounds?: MapLatLngBounds, padding?: MapPadding) => void
```

* `bounds` - [LatLngBounds](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds) | [LatLngBoundsLiteral](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral)
* `padding` - number | [Padding](https://developers.google.com/maps/documentation/javascript/reference/coordinates#Padding)

Sets the viewport to contain the given bounds. If the `bounds` argument is falsy, the bounds will fit to current markers' position.

### `removeBounds`

``` typescript
removeBounds: (options: {
    center?: MapOptions['center']
    zoom?: MapOptions['zoom']
} = {}) => void
```

Remove bounds and set default [`center`](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.center) position and [`zoom`](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.zoom) from default options or params passed in `options` argument.

### `createInfoWindow`

``` typescript
createInfoWindow: (marker: Marker, options: InfoWindowOptions) => void
```

* [`marker`](https://developers.google.com/maps/documentation/javascript/reference/marker) - Marker instance
* [`options`](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions.content) - Info Window Options

Creates an info window with the given options.

### `removeInfoWindow`

``` typescript
removeInfoWindow: (marker: Marker) => void
```

Removes info window from [marker](https://developers.google.com/maps/documentation/javascript/reference/marker) passed as argument
