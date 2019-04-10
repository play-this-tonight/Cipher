import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class IntroScreen extends Component {
  render() {
    return (
      <Fragment>
        <section>
          <p>You are a hacker trying to decrypt secret communications.</p>
          <p>There are 5 secret words, known to both of the communicators but unknown to you.</p>
          <p>Each round they will transmit 3 unique words.</p>
          <p>Your goal is to correctly guess the squence of words being submitted. </p>
        </section>
        <button>
          <Link to="/start-game">Start Game</Link>
        </button>
      </Fragment>
    );
  }
}
