import React from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import { Link } from '@reach/router';
import * as Config from '../config.json';
import { Card, Button } from 'react-bootstrap';
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
          <div class="container-fluid">
            <ul>
              {this.state.shows.map(show => (
                <Card key={`show_${show._id}`} style={{ width: '18rem' }}>
                  <Card.Img id="showImage" src={show.Image} alt="showImage" />
                  <Card.Body>
                    <Card.Text to={`/show/${show._id}`} >
                      Number of Episodes: {show.NoOfEpisodes}
                    </Card.Text>
                    <Link to={`/show/${show._id}`} variant="primary">{show.Title}</Link>
                  </Card.Body>
                </Card>
              ))}
            </ul>
            <p><Link to="/add-show"> Add a new Show</Link></p>

            <p><Link to="/genres"> View All Genres</Link></p>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.showsAPI))
      .then(res => res.json())
      .then(json => {
        this.setState({ shows: json });
        this.setState({ showsLoaded: true });
      })
      .catch(err => {
        this.setState({ showsLoaded: true });
      });
  }

}

export default Shows;

