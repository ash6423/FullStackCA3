import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class BestOriginalSeries extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.BestOriginalSeries && this.state.BestOriginalSeriesLoaded === true) {
      return (
        <p>Error loading BestOriginalSeries. Try again later.</p>
      );
    } else if (!this.state.BestOriginalSeries) {
      return (
        <p>Loading BestOriginalSeries...</p>
      );
    } else if (this.state.BestOriginalSeries.length === 0) {
      return (
        <p>Sorry, no BestOriginalSeries are available</p>
      );
    } else {
      return (
        <div>
          <h1>All BestOriginalSeries in the database</h1>
          <ul>
            {this.state.BestOriginalSeries.map(OriginalSeries => (
              <li key={`BestOriginalSeries_${BestOriginalSeries._id}`}><Link to={`/BestOriginalSeries/${BestOriginalSeries._id}`}>{BestOriginalSeries.Title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-BestOriginalSeries'>Add a new BestOriginalSeries</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.BestOriginalSeriesAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({BestOriginalSeries       : json});
        this.setState({BestOriginalSeriesLoaded : true});
      })
      .catch(err => {
        this.setState({BestOriginalSeriesLoaded: true});
      });
  }

}

export default BestOriginalSeries;

