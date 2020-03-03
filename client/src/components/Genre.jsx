import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class Genre extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {
  Genre     : ''
}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.genre && this.state.genreLoaded === true) {
      return (
        <p>Error loading genre. Try again later.</p>
      );
    } else if (!this.state.genre) {
      return (
        <p>Loading genre...</p>
      );
    } else if (this.state.genre.length === 0) {
      return (
        <p>Sorry, no genre is available</p>
      );
    } else {
      return (
        <div>
          <h1>Genre: {this.state.genre.Genre}</h1>
          <Link to='../../genres'>Back to All genres</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.genresAPI}/${this.props.genreID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({genre       : json});
        this.setState({genreLoaded : true});
      })
      .catch(err => {
        this.setState({genreLoaded: true});
      });
  }

}

export default Genre;
