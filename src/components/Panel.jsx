import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { chapters } from '../config/options';
import accessibility from '../../data/assets/accessibility.jpg';
import buildings from '../../data/assets/buildings.png';
import elevation from '../../data/assets/elevation.png';
import precip from '../../data/assets/precip.png';
import evacCenters from '../../data/assets/evac_centers.png';
import popHazard from '../../data/assets/pop_hazard.png';
import idealCoverage from '../../data/assets/ideal_coverage.png';
import sampaguita from '../../data/assets/sampaguita_gym.png';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  setActiveChapter = (newChapter) => {
    const { chapterName, updateChapter } = this.props;

    if (newChapter === chapterName) return;

    document.getElementById(newChapter).setAttribute('class', 'active');
    document.getElementById(chapterName).setAttribute('class', '');

    updateChapter(newChapter);
  }

   isElementOnScreen = (id) => {
     const element = document.getElementById(id);
     const bounds = element.getBoundingClientRect();
     return bounds.top < window.innerHeight && bounds.bottom > 0;
   }

  handleScroll = (e) => {
    const chapterNames = Object.keys(chapters);
    let i;

    for (i = 0; i < chapterNames.length; i += 1) {
      const chapterName = chapterNames[i];
      if (this.isElementOnScreen(chapterName)) {
        this.setActiveChapter(chapterName);
        break;
      }
    }
  }


  render() {
    return (
      <div id="features" onScroll={this.handleScroll}>
        <section id="intro_chapter" className="active">
          <Typography variant="h3">Los Angeles County</Typography>
          <br></br>
          <Typography>
            The goal of this project is to identify the accessibility to Community Assets such as art collections, parks, and a variety of assets that can be defined as cultural and art assets.  In the following sections accessibility to these locations will be analyzed and explored.
          </Typography>
          <br></br>
          <Typography>
            Los Angeles County is comprised of several hundred zip codes, ranging in shapes and sizes.  The hexagon view was created to provide a standardized view of the county when processing certain data points.  The hexagons were developed north to south at 4000 meters.  This range of measurement was determined based on research conducted in the early days of the COVID-19 pandemic that  highlighted most people were within four miles of a grocery store.
          </Typography>
          <br></br>
          <Typography>
            A key factor when speaking about accessibility is the availability of different modes of transportation.  Loaded onto the hexagon map were seven layers of transportation; primary roads, highways, residential roads,secondary roads, metro line, bus line, and footways. A score of 0-7 was derived by determining how many modes of transportation passed through the hexagon. Many hexagons contained several roads of the same type but were only counted as one.  
          </Typography>
          <br></br>
          <Typography>
            Out of the 847 hexagons 149 contained no modes of transportation, 170- one mode, 156- two modes, 75- three modes, 65- four modes, 82- five modes, 92- six modes, 58- seven modes.
          </Typography>
          <br></br>
        </section>
        <section id="museum_chapter">
          <Typography variant="h3">Arts and Museums</Typography>
          <Typography>
            Los Angeles County has a collection of contemporary and historic artwork located on County property. One slice of this civic artwork was identified and analyzed using a cost distance model on the transportation modes and the locations of the 142 unique facilities containing over 300 pieces of artwork.
          </Typography>
          <br></br>
          <Typography>
            Shown based on the cost distance model the lighter the color of the raster the lower the cost and the darker colors (red) indicates a higher higher cost  to get to the location. For reference the transportation layer was overlaid on the cost distance model.  The darker the color of the roads identifies an area with multiple modes of transportation indicating a higher level of accessibility. The lighter the color, the fewer modes of transportation are available indicating a lower level of accessibility. A majority of the artwork is contained in areas that have multiple modes of transportation indicating a high accessibility score.
          </Typography>
          <br></br>
          <Typography>
            <div>Icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </Typography>
          <br></br>
        </section>
        <section id="park_chapter">
          <Typography variant="h3">Parks</Typography>
          <Typography>
            Los Angeles County has a wide variety of parks with over 2700 identified as a "park."   The county parks were identified and analyzed using a cost distance model on the transportation modes and the locations of parks.
          </Typography>
          <br></br>
          <Typography>
            Shown based on the cost distance model the lighter the color of the raster the lower the cost and the darker colors (red) indicates a higher higher cost  to get to the location. For reference the transportation layer was overlaid on the cost distance model.  The darker the color of the roads identifies an area with multiple modes of transportation indicating a higher level of accessibility. The lighter the color, the fewer modes of transportation are available indicating a lower level of accessibility.   A majority of the parks are contained in areas that have multiple modes of transportation indicating a high accessibility score. 
          </Typography>
          <br></br>
          <Typography>
            <div>Icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </Typography>
        </section>
        <section id="quality_chapter">
          <Typography variant="h3">Quality of Life</Typography>
          <Typography>
            As previously discussed Los Angeles County has many art collections and parks for the residents to enjoy. This example combines the parks, art collection, museums, free concerts,  and performance art into one layer. Shown based on the cost distance model the lighter the color of the raster the lower the cost and the darker colors (red) indicates a higher higher cost  to get to the location. For reference the transportation layer was overlaid on the cost distance model.  The darker the color of the roads identifies an area with multiple modes of transportation indicating a higher level of accessibility. The lighter the color, the fewer modes of transportation are available indicating a lower level of accessibility.   A majority of the community assets are contained in areas that have multiple modes of transportation indicating a high accessibility score.  
          </Typography>
          <br></br>
        </section>
      </div>
    );
  }
}

Panel.propTypes = {
  chapterName: PropTypes.string.isRequired,
  updateChapter: PropTypes.func.isRequired,
};
