import { Controller } from 'stimulus'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder'

export default class extends Controller {
  connect() {
    console.log('Hello, from MapController', this.markers)
    console.log(process.env.MAPBOX_API_KEY)
    this._initMap()
    this._addMarkers()
    this._initSearch()
  }

  _initMap() {
    mapboxgl.accessToken = this.data.get('mapboxApiKey')
    this.map = new mapboxgl.Map({
      container: this.element,
      style: 'mapbox://styles/pdunleav/cjofefl7u3j3e2sp0ylex3cyb'
    });
    this.map.on('load', () => {
      this.map.resize()
      this._fitMapToMarkers()
    })
  }

  _addMarkers() {
    this.markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
      const element = this._customMarker(marker)

      new mapboxgl.Marker(element)
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  _fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }

  _customMarker({ image_url }) {
    const element = document.createElement('div')
    element.className = 'marker'
    element.style.backgroundImage = `url('${image_url}')`
    element.style.backgroundSize = 'cover'
    element.backgroundRepeat = 'no-repeat'
    element.style.width = '20px'
    element.style.height = '35px'

    return element
  }

  _initSearch() {
    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));
  }

  get markers() {
    return this.data.has('markers')
      ? JSON.parse(this.data.get('markers'))
      : []
  }
}
