import { latLng, tileLayer } from 'leaflet'

export enum MapZoomLevels {
  WHOLE_NL = 8,
  LOCATION_FOCUS = 15,
  SELECTION_FOCUS = 17,
}

export const MAP_OPTIONS: L.MapOptions = {
  layers: [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:MapZoomLevels.SELECTION_FOCUS })
  ],
  zoom:  MapZoomLevels.WHOLE_NL,
  center: latLng(52.1326, 5.2913),
  zoomControl: true,
  maxZoom: MapZoomLevels.SELECTION_FOCUS,
  minZoom: MapZoomLevels.WHOLE_NL,
};
