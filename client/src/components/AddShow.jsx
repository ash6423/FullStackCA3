import React              from 'react';
import {navigate, Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class AddShow extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {
    Title     : '',
    Seasons    : '',
    FirstEpisodeDate : '',
    FinalEpisodeDate : '',
    NoOfEpisodes : ''
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
        <div>Adding show...</div>
      );
    } else {
      return (
        <div>
          <h1>Add a show</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <div>
              <label>Show Title:
                <input type='text' value={this.state.Title} onChange={this.handleTitleUpdate.bind(this)} />
              </label>

              <label>Number of Seasons:
                <input type='text' value={this.state.Seasons} onChange={this.handleSeasonsUpdate.bind(this)} />
              </label>

              <label>Show air date:
                <input type='text' value={this.state.FirstEpisodeDate} onChange={this.handleFirstEpisodeDateUpdate.bind(this)} />
              </label>
  
              <label>Air date of the final episode:
                <input type='text' value={this.state.FinalEpisodeDate} onChange={this.handleFinalEpisodeDateUpdate.bind(this)} />
              </label>

              <label>No of Episodes:
                <input type='text' value={this.state.NoOfEpisodes} onChange={this.handleNoOfEpisodesUpdate.bind(this)} />
              </label>
            </div>

            {/* <div>
              <label>show Content:
                <textarea value={this.state.content} onChange={this.handleContentUpdate.bind(this)}></textarea>
              </label>
            </div> */}

            <div>
              <input type='submit' value='Add Show' />
            </div>

          </form>
          <Link to='/'>Back to All shows</Link>
        </div>
      );
    }
  }

  handleTitleUpdate(e) {
    this.setState({Title: e.target.value || null});
  }

  handleSeasonsUpdate(e) {
    this.setState({Seasons: e.target.value || null});
  }

  handleFirstEpisodeDateUpdate(e) {
    this.setState({FirstEpisodeDate: e.target.value || null});
  }

  handleFinalEpisodeDateUpdate(e) {
    this.setState({FinalEpisodeDate: e.target.value || null});
  }

  handleNoOfEpisodesUpdate(e) {
    this.setState({NoOfEpisodes: e.target.value || null});
  }

  handleSubmit(e) {

    // Prevent the default form submit action
    e.preventDefault();

    // Perform a POST call for the new data
    fetch(urlToCurrentDomain(`${Config.showsAPI}`), {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Title     : this.state.Title,
        Seasons : this.state.Seasons,
        FirstEpisodeDate : this.state.FirstEpisodeDate,
        FinalEpisodeDate : this.state.FinalEpisodeDate,
        NoOfEpisodes : this.state.NoOfEpisodes
      })}
    )
      .then (res  => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then (json => navigate(`/show/${json._id}`))
      .catch(err => {
        this.setState({reportedError: err.message || 'Unknown'});
      })

  }

  resetForRetry() {
    this.setState({reportedError: null});
  }

  componentDidMount() {
    // this.getComments(this.props.showID);
  }

}

export default AddShow;
