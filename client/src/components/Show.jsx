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

    if (!this.state.show && this.state.showLoaded === true) {
      return (
        <p>Error loading shows. Try again later.</p>
      );
    } else if (!this.state.show) {
      return (
        <p>Loading shows...</p>
      );
    } else if (this.state.show.length === 0) {
      return (
        <p>Sorry, no shows are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.show.Title}</h1>
          <h1>Season: {this.state.show.Seasons}</h1>
          <h1>First Episode Date: {this.state.show.FirstEpisodeDate}</h1>
          <h1>Final Episode Date: {this.state.show.FinalEpisodeDate}</h1>
          <h1>Episodes: {this.state.show.NoOfEpisodes}</h1>
          <Link to='/'>Back to All shows</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.showsAPI}/${this.props.showID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({show       : json});
        this.setState({showLoaded : true});
      })
      .catch(err => {
        this.setState({showLoaded: true});
      });
  }

}

export default Show;
