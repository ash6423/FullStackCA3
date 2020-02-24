import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Shows extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.shows && this.state.showsLoaded === true) {
      return (
        <p>Error loading shows. Try again later.</p>
      );
    } else if (!this.state.shows) {
      return (
        <p>Loading shows...</p>
      );
    } else if (this.state.shows.length === 0) {
      return (
        <p>Sorry, no shows are available</p>
      );
    } else {
      return (
        <div>
          <h1>All Shows in the database</h1>
          <ul>
            {this.state.shows.map(show => (
              <li key={`show_${show._id}`}><Link to={`/show/${show._id}`}>{show.Title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-show'>Add a new Show</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.showsAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({shows       : json});
        this.setState({showsLoaded : true});
      })
      .catch(err => {
        this.setState({showsLoaded: true});
      });
  }

}

export default Shows;

