const center = [-118.2437, 34.0522];
const pitch = 0;
const bearing = 0.13;
const zoom = 8;

const chapters = {
  marikina: {
    paint: [
      {
        id: 'zip-fill',
        opacity: 0.5,
      },
      {
        id: 'zip-borders',
        opacity: .8,
      },
      {
        id: 'zip-borders-extrude',
        opacity: 0,
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
        visibility: 'none',
      },
      {
        id: 'parks-layer',
        visibility: 'none',
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
  museum_chapter: {
    paint: [
      {
        id: 'zip-fill',
        opacity: 0.5,
      },
      {
        id: 'zip-borders',
        opacity: .6,
      },
      {
        id: 'zip-borders-extrude',
        opacity: 0,
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
        visibility: 'none',
      },
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom: 9,
      center,
      duration: 800,
    },
  },
  park_chapter: {
    paint: [
      {
        id: 'zip-fill',
        opacity: 0.5,
      },
      {
        id: 'zip-borders',
        opacity: .6,
      },
      {
        id: 'zip-borders-extrude',
        opacity: 0,
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
        visibility: 'none',
      },
      {
        id: 'parks-layer',
        visibility: 'visible',
      },
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom: 9,
      center,
      duration: 800,
    },
  },
  salary_chapter: {
    paint: [
      {
        id: 'zip-fill',
        opacity: 0,
      },
      {
        id: 'zip-borders',
        opacity: .6,
      },
      {
        id: 'zip-borders-extrude',
        opacity: .75,
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
        visibility: 'none',
      },
      {
        id: 'parks-layer',
        visibility: 'none',
      },
    ],
    position: {
      pitch: 60,
      bearing: 0,
      zoom: 9,
      center,
      duration: 800,
    },
  },
  conclusion: {
    paint: [
      {
        id: 'zip-fill',
        opacity: .5,
      },
      {
        id: 'zip-borders',
        opacity: .6,
      },
      {
        id: 'zip-borders-extrude',
        opacity: 0,
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
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom: 8,
      center,
      duration: 800,
    },
  }
};

const legendLabels = {
  empty: 'No Legend',
  flood: 'Flood Hazard Levels',
  landelevation3d: 'Land Elevation',
};

const filters = {
  museum_chapter: [
    {
      hasAll: true,
      value: 'buildingType',
      label: 'Type',
      onChange: 'updateBuildingType',
      options: [
        {
          label: 'Museum',
          value: 'museum',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Garden',
          value: 'garden',
        },
        {
          label: 'Pier',
          value: 'pier',
        },
      ],
    },
  ],
  conclusion: [
    {
      hasAll: false,
      value: 'iconFilter',
      label: 'Suitability Return Period',
      onChange: 'updateSuitabilityYear',
      options: [
        {
          label: 'All',
          value: 'all',
        },
        {
          label: 'Museums',
          value: 'museum',
        },
        {
          label: 'Parks',
          value: 'park',
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
  museum_chapter: {
    layer: 'buildings',
    features: [
      {
        label: 'Type',
        value: 'category',
      },
    ],
  },
  park_chapter: {
    layer: 'buildings',
    features: [
      {
        label: 'Building Type',
        value: 'category',
      },
    ],
  },
};
/*
                  [0, '#000000'],
                  [25000, '#660000'],
                  [50000, '#112200'],
                  [75000, '#052200'],
                  [200000, '#006600']
                  */

// legend options
const legendOptions = {
  landelevation3d: {
    name: 'Not being used',
    colors: ['#660000', '#006600'],
    min: 2,
    max: 70,
    range: true,
  },
  landelevation: {
    name: 'Median Salary',
    colors: ['#AA0000', '#00AA00'],
    min: 25000,
    max: 200000,
    range: true,
  },
  /*
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
  */
};


//chapter layers

const chapterLayers = {
  marikina: ['landelevation'],
  museum_chapter: ['landelevation'],
  park_chapter: ['landelevation'],
  salary_chapter: ['landelevation'],
  conclusion: ['landelevation'],
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
