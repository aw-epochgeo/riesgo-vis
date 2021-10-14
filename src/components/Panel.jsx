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
          <Typography>
            Text about Los Angeles County. Display the zipcode borders for Los Angeles.
          </Typography>
          <br></br>
          <Typography variant="h6">Subtitle</Typography>
          <Typography>
            More information.
          </Typography>
          <br></br>
        </section>
        <section id="museum_chapter">
          <Typography variant="h3">Arts and Museums</Typography>
          <Typography>
            Text about Los Angeles County. Display Arts and Museums.
          </Typography>
          <br></br>
          <Typography variant="h6">Subtitle</Typography>
          <Typography>
            Text about Los Angeles County. Display Arts and Museums.
          </Typography>
          <br></br>
        </section>
        <section id="park_chapter">
          <Typography variant="h3">Parks</Typography>
          <Typography>
            Text about Los Angeles County. Display parks.
          </Typography>
          <br></br>
          <Typography variant="h6">Subtitle</Typography>
          <Typography>
            Text about Los Angeles County. Display parks.
          </Typography>
          <br></br>
          <Typography variant="h6">Subtitle</Typography>
          <Typography>
            Text about Los Angeles County. Display parks.
          </Typography>
        </section>
        <section id="salary_chapter">
          <Typography variant="h3">Median Salary</Typography>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode.
          </Typography>
          <br></br>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode.
          </Typography>
          <br></br>
          <br></br>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode.
          </Typography>
          <br></br>
          <Typography variant="h6">Subtitle</Typography>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode.
          </Typography>
        </section>
        <section id="conclusion_chapter">
          <Typography variant="h3">Conclusion</Typography>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode, arts, and parks.
          </Typography>
          <br></br>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode, arts, and parks.
          </Typography>
          <br></br>
          <Typography> 
            Text about Los Angeles County. Display the average salary for each zipcode, arts, and parks.
          </Typography>
          <br></br>
          <Typography variant="h6">Subtitle</Typography>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode, arts, and parks.
          </Typography>
          <br></br>
          <Typography variant="h6">Subtitle</Typography>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode, arts, and parks.
          </Typography>
          <br></br>
          <Typography variant="h6">Subtitle</Typography>
          <Typography>
            Text about Los Angeles County. Display the average salary for each zipcode, arts, and parks.
          </Typography>
        </section>
      </div>
    );
  }
}

Panel.propTypes = {
  chapterName: PropTypes.string.isRequired,
  updateChapter: PropTypes.func.isRequired,
};
