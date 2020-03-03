import React              from 'react';
import {navigate, Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class AddGenre extends React.Component {

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

    if (this.state.reportedError) {
      return (
        <div>
          <h1>Error</h1>
          <p>Sorry, there was an error creating the show. The error was: {this.state.reportedError || 'Unknown'}</p>
          <a href='#' onClick={this.resetForRetry.bind(this)}>Try again</a>&nbsp;|&nbsp;
          <Link to='/'>Back to All shows</Link>
        </div>
      );
    } else if (this.state.processingAdd) {
      return (
        <div>Adding genre...</div>
      );
    } else {
      return (
        <div>
          <h1>Add a genre</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <div>
              <label>Show Genre:
                <input type='text' value={this.state.Genre} onChange={this.handleGenreUpdate.bind(this)} />
              </label>
            </div>

            {/* <div>
              <label>show Content:
                <textarea value={this.state.content} onChange={this.handleContentUpdate.bind(this)}></textarea>
              </label>
            </div> */}

            <div>
              <input type='submit' value='Add Genre' />
            </div>

          </form>
          <Link to='/'>Back to All Genre</Link>
        </div>
      );
    }
  }

  handleGenreUpdate(e) {
    this.setState({Genre: e.target.value || null});
  }

  

  handleSubmit(e) {

    // Prevent the default form submit action
    e.preventDefault();

    // Perform a POST call for the new data
    fetch(urlToCurrentDomain(`${Config.genresAPI}`), {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       
        Genre     : this.state.Genre
      })}
    )
      .then (res  => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then (json => navigate(`/genre/${json._id}`))
      .catch(err => {
        this.setState({reportedError: err.message || 'Unknown'});
      })

  }

  resetForRetry() {
    this.setState({reportedError: null});
  }

  componentDidMount() {
    // this.getComments(this.props.genreID);
  }

}

export default AddGenre;
