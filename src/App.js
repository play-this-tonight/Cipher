import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainGame from './Components/Game/MainGame';
import IntroScreen from './Components/Lobby/IntroScreen';
import EndGame from './Components/EndScreen';
import Header from './Components/Header/index';
import './Root.css';
import LogRocket from 'logrocket';
LogRocket.init('jxvzvo/cipher');
// import 'normalize.css';
// import './App.css';
// import 'flexboxgrid';

class App extends Component {
  render() {
    return (
      <Router>
        {/* <a><h1>This is a test</h1></a> */}
        <Route path="/" component={Header} />
        <Route path="/" exact component={IntroScreen} />
        <Route
          path="/game/:gameKey"
          render={({ match }) => <MainGame match={match} />}
        />
        <Route
          path="/show-results/:gameKey"
          render={({ match }) => <EndGame match={match} />}
        />
      </Router>
    );
  }
}

export default App;
