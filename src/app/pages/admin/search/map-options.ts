export enum MapZoomLevels {
  WHOLE_NL = 8,
  LOCATION_FOCUS = 15,
  SELECTION_FOCUS = 17,
}

export const MAP_OPTIONS: google.maps.MapOptions = {
  zoomControl: true,
  scrollwheel: true,
  disableDefaultUI: true,
  keyboardShortcuts: false,
  maxZoom: MapZoomLevels.SELECTION_FOCUS,
  minZoom: MapZoomLevels.WHOLE_NL,
  styles: [
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
};
