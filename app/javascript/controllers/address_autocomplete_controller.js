import { Controller } from 'stimulus'
import places from 'places.js'

export default class extends Controller {
  initialize() {
    places({ container: this.element })
  }
}