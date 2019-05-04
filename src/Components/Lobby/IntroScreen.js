import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { startGame } from '../../Graph';
import { Redirect } from "react-router-dom";

export default class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameHasLoaded: false,
    }

  }
  startGame = () => {
    startGame()
      .then(({ startGame: gameKey }) => {
        this.setState(state => ({
          gameHasLoaded: true,
          gameKey,
        }))
      })
  }

  render() {
    const { gameHasLoaded, gameKey } = this.state;
    if (gameHasLoaded) {
      return <Redirect to={`/game/${gameKey}`} />
    }
    return (
      <Fragment>
        <section>
          <p>You are a hacker trying to decrypt secret communications.</p>
          <p>There are 5 secret words, known to both of the communicators but unknown to you.</p>
          <p>Each round they will transmit 3 unique words.</p>
          <p>Your goal is to correctly guess the squence of words being submitted. </p>
        </section>
        <button onClick={this.startGame}>
          Start Game
        </button>
      </Fragment>
    );
  }
}
