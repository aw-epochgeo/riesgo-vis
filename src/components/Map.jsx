import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import Legend from './Legend';
import MapTooltip from './MapTooltip';
import {
  chapters, floodStops, suitabilityStops, isoStops, tooltipConfig,
} from '../config/options';

//mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW5laGVueW8iLCJhIjoiY2pndWV6dThmMTJlYTJxcTl5aDBoNTg5aSJ9.4qHmp0Q31Yuntdp6Ee_x-A';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHJ3YWxrZXIiLCJhIjoiY2t1ZnBzM3B6MXdsZjJubXp3MzF5cWFxZiJ9.Of5G1YXwvgqYUc0xvxP2mg';

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 34.0522,
      lng: -118.2437,
      zoom: 8,
    };
  }

  componentDidMount() {
    const {
      lng, lat, zoom,
    } = this.state;

    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div'); // eslint-disable-line

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [lng, lat],
      zoom,
      minZoom: 7,
      maxZoom: 15,
      pitch: 60,
      bearing: 0.13,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    this.map.on('style.load', () => {

      /* LA County Additions */

      this.map.addSource('zipcodes', {
        type: 'geojson',
        data: '/data/zipCity.geojson'
      });
      this.map.addSource('parks', {
        type: 'geojson',
        data: '/data/parks_new.geojson'
      });
      this.map.addSource('museums', {
        type: 'geojson',
        data: '/data/art_museums_new.geojson'
      });

      this.map.addSource('cost-distance-source', {
        type: 'raster',
        url: 'mapbox://alexrwalker.c8yk9yr0',
      });

      this.map.addSource('hexagon-source', {
        type: 'vector',
        url: 'mapbox://alexrwalker.2fbojb14',
      });


      /*Load images to be used as icons*/

      /*<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/
      this.map.loadImage(
        '/data/icons/museum.png',
        (error, image) => {
        if (error) throw error;
          // Add the image to the map style.
          this.map.addImage('museum', image);
        }
      );

      /*<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/
      this.map.loadImage(
        '/data/icons/tree.png',
        (error, image) => {
        if (error) throw error;
          // Add the image to the map style.
          this.map.addImage('park', image);
        }
      );


      /* create layers from sources*/
      
      this.map.addLayer({
        id: 'cost-distance-layer',
        type: 'raster',
        source: 'cost-distance-source',
        paint: {
          'raster-fade-duration': 0,
        },
        layout: {
            visibility: 'none',
        }
      });
      
      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      this.map.addLayer({
        id: 'museums-layer',
        type: 'symbol',
        source: 'museums',
        layout: {
          visibility: 'none',
          'icon-image': 'museum',
          'icon-size': 0.035
        }
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      this.map.addLayer({
        id: 'parks-layer',
        type: 'symbol',
        source: 'parks',
        layout: {
            visibility: 'none',
          'icon-image': 'park',
          'icon-size': 0.035
        }
      });

      this.map.addLayer({
        id: 'zip-fill',
        type: 'fill',
        source: 'zipcodes',
        layout: {},
        paint: {
          'fill-color': {
              property: 'SALARY',
              stops: [
                  [0, '#000000'],
                  [1, '#AA6666'],
                  [200000, '#00AA00']
              ],
            },
          'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
            1,
            0.0
          ]
        }
      });
 
      this.map.addLayer({
        id: 'zip-borders',
        type: 'line',
        source: 'zipcodes',
        layout: {},
        paint: {
          'line-color': '#627BC1',
          'line-width': 1
        }
      });


      this.map.addLayer({
        id: 'zip-borders-extrude',
        type: 'fill-extrusion',
        source: 'zipcodes',
        paint: {
          'fill-extrusion-color': {
              property: 'SALARY',
              stops: [
                  [0, '#000000'],
                  [1, '#AA6666'],
                  [200000, '#00AA00']
              ],
            },
            'fill-extrusion-height': ['*', .01, ['get', 'SALARY']],
            // Make extrusions slightly opaque to see through indoor walls.
            'fill-extrusion-opacity': 0
          },
      });

      this.map.addLayer({
        id: 'hexagon-layer',
        type: 'fill-extrusion',
        source: 'hexagon-source',
        'source-layer': 'Transportation_count-9179m8', // name of tilesets
        'paint': {
          'fill-extrusion-color': {
              property: 'Total_Coun',
              stops: [
                  [0, '#0000FF'],
                  [7, '#FF0000']
              ],
            },
            'fill-extrusion-height': ['*', 1000, ['get', 'Total_Coun']],
            // Make extrusions slightly opaque to see through indoor walls.
            'fill-extrusion-opacity': .7
        },
        layout: {
            visibility: 'visible',
        }
      });

      /*End of LA County Additions*/

    });


    this.tooltipContainer = document.createElement('div');

    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [-110, 0],
    }).setLngLat([0, 0]).addTo(this.map);

    this.map.on('click', (e) => {
      const { chapterName } = this.props;
    });

    this.map.on('mousemove', (e) => {
      const { chapterName } = this.props;
      const tooltipOptions = tooltipConfig[chapterName];

      if (tooltipOptions !== undefined) {
        const features = this.map.queryRenderedFeatures(e.point, { layers: [tooltipOptions.layer] });

        if (features.length > 0) {
          const selected = features[0].properties;

          if (selected !== undefined) {
            this.map.getCanvas().style.cursor = features.length ? 'default' : '';
          }
        }

        tooltip.setLngLat(e.lngLat);
        this.setTooltip(features, tooltipOptions);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      chapterName, amenity, buildingType, layer,
      floodYear, minutes, suitabilityYear,
    } = this.props;

    if (this.map.isStyleLoaded()) {
      if (nextProps.chapterName !== chapterName) {
        const { paint, layout, position } = chapters[nextProps.chapterName]; // eslint-disable-line

        paint.forEach((data) => {
          const currentLayer = this.map.getLayer(data.id);

          if (currentLayer !== undefined) {
            const layerType = currentLayer.type;
            this.map.setPaintProperty(data.id, `${layerType}-opacity`, data.opacity);
          }
        });

        layout.forEach((data) => {
          this.map.setLayoutProperty(data.id, 'visibility', data.visibility);
        });

        this.map.easeTo(position);

        /*
        // Try filter buildings based on chapterName
        if (nextProps.chapterName === 'park_chapter') {
          this.map.setFilter('buildings', ['<=', 'fhm005yrs', 2]);
        } else {
          this.map.setFilter('buildings', undefined);
        }
        */
      }

      if (nextProps.amenity) {
        if (nextProps.amenity !== amenity) {
          if (nextProps.amenity !== 'all') {
            console.log(nextProps.amenity);
            //this.map.setFilter('evacuation', ['==', 'amenity', nextProps.amenity]);
            this.map.setFilter('museums-layer', ['==', 'amenity', nextProps.amenity]);
            this.map.setFilter('parks-layer', ['==', 'amenity', nextProps.amenity]);
            this.map.setFilter('radius', ['==', 'amenity', nextProps.amenity]);
            this.map.setFilter('walking', ['all', ['==', 'amenity', nextProps.amenity], ['==', 'AA_MINS', minutes]]);
          } else {
            //this.map.setFilter('evacuation', undefined);
            this.map.setFilter('museums-layer', undefined);
            this.map.setFilter('parks-layer', undefined);
            this.map.setFilter('radius', undefined);
            this.map.setFilter('walking', ['==', 'AA_MINS', minutes]);
          }
        }
      }

      if (nextProps.buildingType) {
        if (nextProps.buildingType !== buildingType) {
          if (nextProps.buildingType !== 'all') {
            this.map.setFilter('buildings', ['==', 'category', nextProps.buildingType]);
          } else {
            this.map.setFilter('buildings', undefined);
          }
        }
      }

      if (nextProps.layer) {
        if (nextProps.layer !== layer) {
          const current = this.map.getLayer(layer);
          const newlayer = this.map.getLayer(nextProps.layer);

          if (current !== undefined) {
            const layerType = current.type;
            this.map.setPaintProperty(layer, `${layerType}-opacity`, 0);
          }

          if (current !== undefined) {
            const layerType = newlayer.type;
            this.map.setPaintProperty(nextProps.layer, `${layerType}-opacity`, 0.7);
          }
        }
      }

      if (nextProps.floodYear) {
        if (nextProps.floodYear !== floodYear) {
          this.map.setPaintProperty('flood', 'fill-color', {
            property: nextProps.floodYear,
            stops: floodStops,
          });
        }
      }

      if (nextProps.minutes) {
        if (nextProps.minutes !== minutes) {
          if (amenity !== 'all') {
            this.map.setFilter('walking', ['all', ['==', 'AA_MINS', nextProps.minutes], ['==', 'amenity', amenity]]);
          } else {
            this.map.setFilter('walking', ['==', 'AA_MINS', nextProps.minutes]);
          }
        }
      }

      if (nextProps.suitabilityYear) {
        if (nextProps.suitabilityYear !== suitabilityYear) {
          this.map.setPaintProperty('suitability', 'fill-color', {
            property: nextProps.suitabilityYear,
            stops: suitabilityStops,
          });
        }
      }
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  /**
   * Creates the tooltip element for the hovered tile
   * @param {object} features - queried features from the map
   * @public
   */
  setTooltip(features, tooltipOptions) {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          MapTooltip, {
            features, tooltipOptions,
          },
        ),
        this.tooltipContainer,
      );
    } else {
      ReactDOM.unmountComponentAtNode(this.tooltipContainer);
    }
  }

  tooltipContainer;

  render() {
    const mapStyle = {
      position: 'fixed',
      width: '70%',
      left: '30%',
      top: 0,
      bottom: 0,
    };

    const { chapterName, layer } = this.props;

    return (
      <div>
        <div style={mapStyle} ref={(el) => { this.mapContainer = el; }} />
        <Legend chapterName={chapterName} layer={layer} />
      </div>
    );
  }
}

Map.propTypes = {
  chapterName: PropTypes.string.isRequired,
  buildingType: PropTypes.string.isRequired,
  amenity: PropTypes.string.isRequired,
  layer: PropTypes.string.isRequired,
  floodYear: PropTypes.string.isRequired,
};
