import React from 'react';
import { Router } from "@reach/router";
import Shows from './Shows';
import Show from './Show';
import AddShow from './AddShow';
import Genres from './Genres';
import Genre from './Genre';
import AddGenre from './AddGenre';
import NavBar from './NavigationBar';
import Carousel from './Carousel';

class App extends React.Component {

  render() {
    return (
      <div>
      
<NavBar />
<Carousel />

        <Router>
          <Shows path='/' />
          <Show path='/show/:showID' />
          <AddShow path='/add-show/' />

          <Genres path='/genres' />
          <Genre path='/genre/:genreID' />
          <AddGenre path='/add-genre/' />
        </Router>
      </div>
    );
  }

}

export default App;
