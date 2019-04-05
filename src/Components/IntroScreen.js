import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class IntroScreen extends Component {
  render() {
    return (
      <Fragment>
        <div>This is the intro screen</div>
        <button>
          <Link to="/start-game">Start Game</Link>
        </button>
      </Fragment>
    );
  }
}
