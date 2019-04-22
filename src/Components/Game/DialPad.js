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
    [1, 2, 3],
    [4, 5],
  ];

  return (
    <div className="dialPad">
      <div className="row">
        {
          dialArray.map((dialRow, index) => (
            <div
              className="col-xs-12 row"
              key={index}
            >
              {
                dialRow.map(number => (
                  <DialButton
                    key={number}
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
