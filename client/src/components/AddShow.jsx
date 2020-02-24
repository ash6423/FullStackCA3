import React              from 'react';
import {navigate, Link}   from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'

class AddShow extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {
    title     : ''
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
              <label>Enter Title:
                <input type='' value={this.state.Title} onChange={this.handleTitleUpdate.bind(this)} />
              </label>

              <label>Enter Number of Seasons:
                <input type='' value={this.state.Season} onChange={this.handleSeasonUpdate.bind(this)} />
              </label>

              <label>Enter Show air date:
                <input type='' value={this.state.Air} onChange={this.handleAirUpdate.bind(this)} />
              </label>
  
              <label>Enter air date of the final episode:
                <input type='' value={this.state.Finalair} onChange={this.handleFinalAirUpdate.bind(this)} />
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
    this.setState({title: e.target.value || null});
  }

  handleSeasonUpdate(e) {
    this.setState({season: e.target.value || null});
  }

  handleAirUpdate(e) {
    this.setState({air: e.target.value || null});
  }

  handleFinalAirUpdate(e) {
    this.setState({finalair: e.target.value || null});
  }

  handleContentUpdate(e) {
    this.setState({content: e.target.value || null});
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
        authoredBy: this.state.authoredBy,
        title     : this.state.title,
        content   : this.state.content
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
