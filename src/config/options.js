const center = [-118.2437, 34.0522];
const pitch = 60;
const bearing = 0.13;
const zoom = 8;

/* START CHAPTERS */

const chapters = {
  intro_chapter: {
    paint: [
      {
        id: 'zip-fill',
        opacity: 0.75,
      },
      {
        id: 'zip-borders',
        opacity: .8,
      },
      {
        id: 'zip-borders-extrude',
        opacity: 0,
      },
      {
        id: 'hexagon-layer',
        opacity: 1,
      },
      {
        id: 'mask-layer',
        opacity: 0,
      }
    ],
    layout: [
      {
        id: 'museums-layer',
        visibility: 'none',
      },
      {
        id: 'parks-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-museums-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-parks-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-both-layer',
        visibility: 'none',
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
      {
        id: 'hexagon-layer',
        opacity: 0,
      },
      {
        id: 'mask-layer',
        opacity: 1,
      }
    ],
    layout: [
      {
        id: 'museums-layer',
        visibility: 'visible',
      },
      {
        id: 'parks-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-museums-layer',
        visibility: 'visible',
      },
      {
        id: 'cost-distance-parks-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-both-layer',
        visibility: 'none',
      },
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom: 8,
      center: [-118.2437, 34.05],
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
      {
        id: 'hexagon-layer',
        opacity: 0,
      },
      {
        id: 'mask-layer',
        opacity: 1,
      }
    ],
    layout: [
      {
        id: 'museums-layer',
        visibility: 'none',
      },
      {
        id: 'parks-layer',
        visibility: 'visible',
      },
      {
        id: 'cost-distance-museums-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-parks-layer',
        visibility: 'visible',
      },
      {
        id: 'cost-distance-both-layer',
        visibility: 'none',
      },
    ],
    position: {
      pitch: 0,
      bearing: 0,
      zoom: 8,
      center,
      duration: 800,
    },
  },
  quality_chapter: {
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
      {
        id: 'hexagon-layer',
        opacity: 0,
      },
      {
        id: 'mask-layer',
        opacity: 1,
      }
    ],
    layout: [
      {
        id: 'museums-layer',
        visibility: 'none',
      },
      {
        id: 'parks-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-museums-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-parks-layer',
        visibility: 'none',
      },
      {
        id: 'cost-distance-both-layer',
        visibility: 'visible',
      },
    ],
    position: {
      pitch: 60,
      bearing: 0,
      zoom: 9,
      center,
      duration: 800,
    },
  }
};

/* END CHAPTERS */


const legendLabels = {
  empty: 'No Legend',
  flood: 'Flood Hazard Levels',
  landelevation3d: 'Land Elevation',
};

const filters = {
  museum_chapter: [
    {
      hasAll: true,
      value: 'amenity',
      label: 'Type',
      onChange: 'updateMuseums',
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
        {
          label: 'Observatory',
          value: 'observatory',
        },
        {
          label: 'Memorial',
          value: 'memorial',
        },
        {
          label: 'Zoo',
          value: 'zoo',
        },
        {
          label: 'Aquarium',
          value: 'aquarium',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },
  ],
  park_chapter: [
    {
      hasAll: true,
      value: 'amenity',
      label: 'Type',
      onChange: 'updateParks',
      options: [
        {
          label: 'Park',
          value: 'park',
        },
        {
          label: 'Beach',
          value: 'beach',
        },
        {
          label: 'Open Space',
          value: 'open_space',
        },
        {
          label: 'Bike Path',
          value: 'bike_path',
        },
        {
          label: 'Small Park',
          value: 'small_park',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },
  ],
};


//tooltips

const tooltipConfig = {
  intro_chapter: {
    layer: 'hexagon-layer',
    features: [
      {
        label: 'Modes of Transport:',
        value: 'Total_Coun',
      },
    ],
  },
  museum_chapter: {
    layer: 'museums-layer',
    features: [
      {
        label: 'Name:',
        value: 'Name',
      },
    ],
  },
  park_chapter: {
    layer: 'parks-layer',
    features: [
      {
        label: 'Name:',
        value: 'PARK_NAME',
      },
    ],
  },
  quality_chapter: {
    layer: 'zip-borders-extrude',
    features: [
      {
        label: 'Median Salary:',
        value: 'SALARY',
      },
    ],
  },
};

// legend options
const legendOptions = {
  landelevation3d: {
    name: 'Not being used',
    colors: ['#660000', '#006600'],
    min: 2,
    max: 70,
    range: true,
  },
  empty: {
    name: '',
    colors: [
      {
        label: 'first',
        color: '#000000'
      },
      {
        label: 'second',
        color: '#888888'
      },
      {
        label: 'last',
        color: '#FFFFFF'
      },
    ],
    range: false,
  },
  landelevation: {
    name: 'Median Salary',
    colors: ['#AA0000', '#00AA00'],
    min: 25000,
    max: 200000,
    range: true,
  },
  transportation_legend: {
    name: 'Modes of Transportation',
    colors: ['#AA0000', '#00AA00'],
    min: 0,
    max: 7,
    range: true,
  },
  salary_legend: {
    name: 'Median Salary',
    colors: ['#AA0000', '#00AA00'],
    min: 25000,
    max: 200000,
    range: true,
  },
  /*
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
  intro_chapter: ['transportation_legend'],
  museum_chapter: ['salary_legend'],
  park_chapter: ['salary_legend'],
  quality_chapter: ['salary_legend'],
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
