import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Genres extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.genres && this.state.genresLoaded === true) {
      return (
        <p>Error loading genres. Try again later.</p>
      );
    } else if (!this.state.genres) {
      return (
        <p>Loading genres...</p>
      );
    } else if (this.state.genres.length === 0) {
      return (
        <p>Sorry, no genres are available</p>
      );
    } else {
      return (
        <div>
          <h1>All Genres in the database</h1>
          <ul>
            {this.state.genres.map(genre => (
              <li key={`genre_${genre._id}`}><Link to={`/genre/${genre._id}`}>{genre.Title}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-genre'>Add a new Show</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.genresAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({genres       : json});
        this.setState({genresLoaded : true});
      })
      .catch(err => {
        this.setState({genresLoaded: true});
      });
  }

}

export default Genres;

