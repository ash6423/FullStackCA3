import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class BestOriginalSerie extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.bestOriginalSerie && this.state.bestOriginalSerieLoaded === true) {
      return (
        <p>Error loading bestOriginalSeries. Try again later.</p>
      );
    } else if (!this.state.bestOriginalSerie) {
      return (
        <p>Loading bestOriginalSeries...</p>
      );
    } else if (this.state.bestOriginalSerie.length === 0) {
      return (
        <p>Sorry, no bestOriginalSeries are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.bestOriginalSerie.Title}</h1>
          <h1>{this.state.bestOriginalSerie.Seasons}</h1>
          <h1>{this.state.bestOriginalSerie.FirstEpisodeDate}</h1>
          <h1>{this.state.bestOriginalSerie.FinalEpisodeDate}</h1>
          <h1>{this.state.bestOriginalSerie.noOfEpisodes}</h1>
          <Link to='/'>Back to All bestOriginalSeries</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.bestOriginalSeriesAPI}/${this.props.bestOriginalSerieID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({bestOriginalSerie       : json});
        this.setState({bestOriginalSerieLoaded : true});
      })
      .catch(err => {
        this.setState({bestOriginalSerieLoaded: true});
      });
  }

}

export default BestOriginalSerie;

