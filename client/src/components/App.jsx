import React      from 'react';
import {Router}   from "@reach/router";
import Shows      from './Shows';
import Show       from './Show';
import AddShow    from './AddShow';
import Genres     from './Genres';
import Genre      from './Genre';
import AddGenre   from './AddGenre';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Shows      path='/' />
        <Show       path='/show/:showID' />
        <AddShow    path='/add-show/' />
        
        <Genres     path='/genres'/>
        <Genre      path='/genre/:genreID' />
        <AddGenre   path='/add-genre/' />

      </Router>     

    );
  }

}

export default App;
