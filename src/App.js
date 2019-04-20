import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainGame from './Components/MainGame';
import IntroScreen from './Components/IntroScreen';
import 'normalize.css';
import './App.css';
import 'flexboxgrid';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className="row">
          <div className="col-xs-12">
            <h1>Code Unravel</h1>
          </div>
        </header>
        <Router>
          <Route path="/" exact component={IntroScreen} />
          <Route path="/start-game" component={MainGame} />
        </Router>
      </Fragment>
    );
  }
}

export default App;
