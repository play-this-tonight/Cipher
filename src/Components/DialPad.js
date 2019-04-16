import React from 'react';

const DialButton = ({ number, pressed, setGuess, unsetGuess }) => (
  <button
    className={pressed ? "pressed" : ""}
    onClick={() => {
      if (pressed) {
        return unsetGuess(number);
      }
      setGuess(number)
    }}
  >
    {number}
  </button>
)

const DialPad = ({ guessedNumbers, setGuess, unsetGuess, spinCounter = '' }) => {
  const dialArray = [
    [1, 4],
    [2, 5],
    [3, 6],
  ]

  return (
    <div className="dialPad">
      <div className="row">
        {
          dialArray.map((dialRow) => (
            <div className="col-xs-12 row">
              {
                dialRow.map(number => (
                  <DialButton
                    pressed={guessedNumbers.includes(number)}
                    setGuess={setGuess}
                    number={number}
                    unsetGuess={unsetGuess}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DialPad;
