const center = [-118.2437, 34.0522];
const pitch = 0;
const bearing = 0.13;
const zoom = 9;

const chapters = {
  marikina: {
    paint: [
      {
        id: 'sub-fill',
        opacity: 0,
      },
      {
        id: 'sub-borders',
        opacity: 1,
      },
      {
        id: 'sub-borders-extrude',
        opacity: 1,
      },
    ],
    layout: [
      {
        id: 'labels',
        visibility: 'none',
      },
      {
        id: 'aoe_labels',
        visibility: 'none',
      },
      {
        id: 'museums-layer',
        visibility: 'visible',
      },
      {
        id: 'parks-layer',
        visibility: 'visible',
      },
      {
        id: 'arts-layer',
        visibility: 'visible',
      },
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom,
      center,
      duration: 800,
    },
  },
  land: {
    paint: [
      {
        id: 'sub-fill',
        opacity: 0,
      },
      {
        id: 'sub-borders',
        opacity: 1,
      },
      {
        id: 'sub-borders-extrude',
        opacity: 1,
      },
    ],
    layout: [
      {
        id: 'labels',
        visibility: 'none',
      },
      {
        id: 'aoe_labels',
        visibility: 'none',
      },
      {
        id: 'museums-layer',
        visibility: 'visible',
      },
      {
        id: 'parks-layer',
        visibility: 'visible',
      },
      {
        id: 'arts-layer',
        visibility: 'visible',
      },
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom,
      center,
      duration: 800,
    },
  },
  typhoon: {
    paint: [
      {
        id: 'sub-fill',
        opacity: 0,
      },
      {
        id: 'sub-borders',
        opacity: 1,
      },
      {
        id: 'sub-borders-extrude',
        opacity: 1,
      },
    ],
    layout: [
      {
        id: 'labels',
        visibility: 'none',
      },
      {
        id: 'aoe_labels',
        visibility: 'none',
      },
      {
        id: 'museums-layer',
        visibility: 'visible',
      },
      {
        id: 'parks-layer',
        visibility: 'visible',
      },
      {
        id: 'arts-layer',
        visibility: 'visible',
      },
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom,
      center,
      duration: 800,
    },
  },
  evacuation: {
    paint: [
      {
        id: 'sub-fill',
        opacity: 0,
      },
      {
        id: 'sub-borders',
        opacity: 1,
      },
      {
        id: 'sub-borders-extrude',
        opacity: 1,
      },
    ],
    layout: [
      {
        id: 'labels',
        visibility: 'none',
      },
      {
        id: 'aoe_labels',
        visibility: 'none',
      },
      {
        id: 'museums-layer',
        visibility: 'visible',
      },
      {
        id: 'parks-layer',
        visibility: 'visible',
      },
      {
        id: 'arts-layer',
        visibility: 'visible',
      },
    ],
    position: {
      pitch: 60,
      bearing: 0,
      zoom,
      center,
      duration: 800,
    },
  },
  conclusion: {
    paint: [
      {
        id: 'sub-fill',
        opacity: 0,
      },
      {
        id: 'sub-borders',
        opacity: 1,
      },
      {
        id: 'sub-borders-extrude',
        opacity: 1,
      },
    ],
    layout: [
      {
        id: 'labels',
        visibility: 'none',
      },
      {
        id: 'aoe_labels',
        visibility: 'none',
      },
      {
        id: 'museums-layer',
        visibility: 'visible',
      },
      {
        id: 'parks-layer',
        visibility: 'visible',
      },
      {
        id: 'arts-layer',
        visibility: 'visible',
      },
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom,
      center,
      duration: 800,
    },
  }
};

const legendLabels = {
  flood: 'Flood Hazard Levels',
  landelevation3d: 'Land Elevation',
};

const filters = {
  land: [
    {
      hasAll: true,
      value: 'buildingType',
      label: 'Building Type',
      onChange: 'updateBuildingType',
      options: [
        {
          label: 'Residential',
          value: 'residential',
        },
        {
          label: 'Private',
          value: 'private',
        },
        {
          label: 'Health',
          value: 'health',
        },
        {
          label: 'Education',
          value: 'education',
        },
      ],
    },
  ],
  typhoon: [
    {
      hasAll: false,
      value: 'floodYear',
      label: 'Flood Hazard Return Period',
      onChange: 'updateFloodYear',
      options: [
        {
          label: '5-year',
          value: 'fhm005yrs',
        },
        {
          label: '25-year',
          value: 'fhm025yrs',
        },
        {
          label: '100-year',
          value: 'fhm100yrs',
        },
      ],
    },
  ],
  evacuation: [
    {
      hasAll: true,
      value: 'amenity',
      label: 'Evacuation Centers',
      onChange: 'updateAmenity',
      options: [
        {
          label: 'Community Centre',
          value: 'community_centre',
        },
        {
          label: 'Basketball Court',
          value: 'basketball_court',
        },
        {
          label: 'School',
          value: 'school',
        },
      ],
    },
    {
      hasAll: false,
      value: 'layer',
      label: 'Toggle Layer',
      onChange: 'updateLayer',
      options: [
        {
          label: 'Land Elevation',
          value: 'landelevation',
        },
        {
          label: 'Flood Hazard Map',
          value: 'flood',
        },
      ],
    },
  ],
  conclusion: [
    {
      hasAll: false,
      value: 'suitabilityYear',
      label: 'Suitability Return Period',
      onChange: 'updateSuitabilityYear',
      options: [
        {
          label: '5-year',
          value: 'mcda005yrs',
        },
        {
          label: '25-year',
          value: 'mcda025yrs',
        },
        {
          label: '100-year',
          value: 'mcda100yrs',
        },
      ],
    },
  ],
};


//tooltips

const tooltipConfig = {
  marikina: {
    layer: 'landelevation3d',
    features: [
      {
        label: 'meters above sea level',
        value: 'value',
        type: 'inline',
      },
    ],
  },
  land: {
    layer: 'buildings',
    features: [
      {
        label: 'Building Type',
        value: 'category',
      },
    ],
  },
  typhoon: {
    layer: 'buildings',
    features: [
      {
        label: 'Building Type',
        value: 'category',
      },
    ],
  },
  evacuation: {
    layer: 'evacuation',
    features: [
      {
        label: 'Name',
        value: 'name',
        type: 'title',
      },
      {
        label: 'Capacity',
        value: 'capacity',
      },
    ],
  },
};


// legend options
const legendOptions = {
  landelevation3d: {
    name: 'Land Elevation (m)',
    colors: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0'],
    min: 2,
    max: 70,
    range: true,
  },
  landelevation: {
    name: 'Land Elevation (m)',
    colors: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0'],
    min: 2,
    max: 70,
    range: true,
  },
  flood: {
    name: 'Flood Hazard',
    colors: [
      {
        label: 'Marginal',
        color: '#ffffb2',
      },
      {
        label: 'Low',
        color: '#fecc5c',
      },
      {
        label: 'Medium',
        color: '#fd8d3c',
      },
      {
        label: 'High',
        color: '#e31a1c',
      },
    ],
    range: false,
  },
  population: {
    name: 'Population (per pixel) (40 sqm)',
    colors: ['#feebe2', '#fbb4b9', '#f768a1', '#c51b8a', '#7a0177'],
    min: 13,
    max: 24,
    range: true,
  },
  radius: {
    name: 'Population Coverage',
    colors: ['#feebe2', '#fbb4b9', '#f768a1', '#c51b8a', '#7a0177'],
    min: '5,700',
    max: '13,900',
    range: true,
  },
  capacity: {
    name: 'Estimated Capacity',
    colors: ['#feebe2', '#fbb4b9', '#f768a1', '#c51b8a', '#7a0177'],
    min: '120',
    max: '2,750',
    range: true,
  },
  suitability: {
    name: 'Suitability',
    colors: [
      {
        label: 'Unsafe',
        color: '#000000',
      },
      {
        label: 'Very Low',
        color: '#b2182b',
      },
      {
        label: 'Low',
        color: '#ef8a62',
      },
      {
        label: 'High',
        color: '#67a9cf',
      },
      {
        label: 'Very High',
        color: '#2166ac',
      },
    ],
    range: false,
  },
};


//chapter layers

const chapterLayers = {
  marikina: ['landelevation3d'],
  land: ['landelevation'],
  typhoon: ['flood'],
  evacuation: ['flood', 'landelevation'],
  conclusion: ['suitability'],
};

const floodStops = [
  [1, '#e31a1c'],
  [2, '#fd8d3c'],
  [3, '#fecc5c'],
  [4, '#ffffb2'],
];

const suitabilityStops = [
  [1, '#000000'],
  [2, '#b2182b'],
  [3, '#ef8a62'],
  [4, '#67a9cf'],
  [5, '#2166ac'],
];

const isoStops = [
  [30, '#bd0026'],
  [25, '#f03b20'],
  [20, '#fd8d3c'],
  [15, '#feb24c'],
  [10, '#feb24c'],
  [5, '#feb24c'],
];

export {
  chapters, legendLabels, filters, legendOptions, chapterLayers, floodStops,
  suitabilityStops, tooltipConfig, isoStops,
};
