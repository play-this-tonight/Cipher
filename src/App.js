import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainGame from './Components/Game/MainGame';
import IntroScreen from './Components/Lobby/IntroScreen';
import EndGame from './Components/EndScreen';
import 'normalize.css';
import './App.css';
import 'flexboxgrid';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className="row">
          <div className="col-xs-12">
            <h1>Cipher</h1>
          </div>
        </header>
        <Router>
          <Route path="/" exact component={IntroScreen} />
          <Route path="/start-game" component={MainGame} />
          <Route path="/end-game" component={EndGame} />
        </Router>
      </Fragment>
    );
  }
}

export default App;
