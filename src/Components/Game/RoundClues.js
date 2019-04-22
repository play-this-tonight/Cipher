import React, { Fragment } from 'react';

const Lock = ({ spinCounter = '', lockNumber, correctAnswer }) => (
  <div className={`lock lock-${lockNumber} ${spinCounter}`}>
    <div className={`lockLine ${correctAnswer}`}></div>
  </div>
)

const getCorrectAnswer = (isCorrect) => {
  if (isCorrect === null) return '';

  return isCorrect ? 'lock-correct' : 'lock-incorrect';
}

const getSpinString = ({ guess = null }) => {
  if (!guess) return 'spin-0';

  if (!guess) return 'spin-0';

  return `spin-${guess}`;
}

const RoundWords = ({ clueWords }) => {
  return (
    <div className="row">
      {clueWords.map(({ word, guess }, index) => (
        <div className={`col-xs-4`} key={word}>
          <div className="box">
            {/* <Lock
              spinCounter={getSpinString(clueWords, index)}
              correctAnswer={getCorrectAnswer(clueWords, index)}
              lockNumber={index + 1}
            /> */}
          </div>
        </div>
      ))}
    </div>
  )
}

const RoundClue = ({ clue, index, indexedSetGuess, invalid = '', setIndexOfNextWord, isCorrect }) => (
  <div className="inputBox col-xs-12">
    <div className={`row between-xs clueBackground ${getCorrectAnswer(isCorrect)}`}>
      <div className="col-xs-2">
        <Lock
          spinCounter={getSpinString(clue)}
          lockNumber={index + 1}
          correctAnswer={getCorrectAnswer(isCorrect)}
        />
      </div>
      <div className="col-xs-6">
        <p className="roundClue">{clue.word}</p>
      </div>
      <div className="col-xs-2">
        <input
          name={index}
          className={`guess word-${index + 1}`}
          type="integer"
          maxLength="1"
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
          value={clue.guess}
          onClick={() => setIndexOfNextWord(index)}
        />
        {
          invalid !== ''
            ? <p className="validation-error">{invalid}</p>
            : null
        }
      </div>
    </div>
  </div>
)



const RoundClues = ({ setGuess, currentRoundWords, setIndexOfNextWord }) => {
  return (
    <Fragment>
      {/* <RoundWords clueWords={currentRoundWords} /> */}
      <div className="col-xs-8">
        <div className="row">
          {currentRoundWords.map((clue, index) => {
            return (
              <RoundClue
                key={`clue-${index}`}
                clue={clue}
                index={index}
                indexedSetGuess={setGuess(index)}
                invalid={clue.invalid}
                setIndexOfNextWord={setIndexOfNextWord}
                isCorrect={clue.isCorrect}
              />
            )
          }
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default RoundClues;
