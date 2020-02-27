import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class Show extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.genre && this.state.genreLoaded === true) {
      return (
        <p>Error loading genres. Try again later.</p>
      );
    } else if (!this.state.genre) {
      return (
        <p>Loading genres...</p>
      );
    } else if (this.state.genre.length === 0) {
      return (
        <p>Sorry, no genres are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.genre.Title}</h1>
          <h1>{this.state.genre.Seasons}</h1>
          <h1>{this.state.genre.FirstEpisodeDate}</h1>
          <h1>{this.state.genre.FinalEpisodeDate}</h1>
          <h1>{this.state.genre.noOfEpisodes}</h1>
          <Link to='/'>Back to All genres</Link>
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
