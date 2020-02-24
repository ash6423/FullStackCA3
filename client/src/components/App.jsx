import React    from 'react';
import {Router} from "@reach/router";
import Shows   from './Shows';
import Show    from './Show';
import AddShow from './AddShow';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Shows   path='/' />
        <Show    path='/show/:showID' />
        <AddShow path='/add-show/' />
      </Router>
    );
  }

}

export default App;
