import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { startGame } from '../../Graph';
import { Redirect } from "react-router-dom";
import { italic } from 'ansi-colors';

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
          <p>In this game, you are a hacker trying to break into an "encrypted vault".</p>
          <p>Each turn you'll get a clue to a non-repeating sequence, based on a series of words, related to the root words.</p>
          <p>i.e. if the root word is <bold>slow</bold>, you might see <italic>sloth</italic>, appear.</p>
          <p>If you guess the sequence correctly, you'll get a shorter sequence (first four, then three, then two)</p>
          <p>But if you guess incorrectly, the sequence for that level will reset, and you will get a new order, and a new set of words.</p>
          <p>Guess the correct sequence 3 times in order to win the game.</p>
          <p>See how quickly you can guess the sequences!</p>
          <p><span className="correct">Blue</span> Means You Got it Right</p>
          <p><span className="incorrect">Red</span>Means You got it wrong, but you've been given a hint to the correct answer.</p>
          <p><span className="strikethrough">Grey</span>Means You got it wrong, and we gave you no hints.</p>
        </section>
        <button onClick={this.startGame}>
          Start Game
        </button>
      </Fragment>
    );
  }
}
