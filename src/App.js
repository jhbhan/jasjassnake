import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Snake1Player from './components/Snake1Player';
import Snake2Player from './components/Snake2Player';
import Landing from './components/Landing';


class App extends Component {

  render(){
    return (
    <>
      <BrowserRouter>
      <div>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/1p" component={Snake1Player}/>
        <Route exact path="/2p" component={Snake2Player}/>
      </div>
      </BrowserRouter>
    </>
    );
  }
}

export default App;
