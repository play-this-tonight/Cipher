import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainGame from './Components/MainGame';
import IntroScreen from './Components/IntroScreen';
import 'normalize.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={IntroScreen} />
        <Route path="/start-game" component={MainGame} />
      </Router>
    );
  }
}

export default App;
