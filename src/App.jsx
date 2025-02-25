import { useState, useEffect, useRef } from "react";
import Die from "./components/Die";
import Timer from "./components/Timer";
import { nanoid } from "nanoid";
import "./App.css";
import Confetti from "react-confetti";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [reset, setReset] = useState(0);
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.value === dice[0].value) &&
    dice.every((die) => die.isHeld === true);

  const focusBtn = useRef(null);

  useEffect(() => {
    if (gameWon) {
      focusBtn.current.focus();
      setIsRunning(false);
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
     // value: Math.ceil(Math.random() * 6),
      value:  6,
      isHeld: false,
      id: nanoid(),
    }));
  }



  useEffect(() => {
    if (gameWon) {
        setIsRunning(false);
        return; 
      }
    
      if (!isRunning && dice.some((die) => die.isHeld)) {
        setIsRunning(true);
    }
  }, [dice, isRunning, gameWon]);


  const diceValue = dice.map((el) => (
    <Die
      value={el.value}
      key={el.id}
      isHeld={el.isHeld}
      hold={() => holdDie(el.id)}
    />
  ));

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice());
      setIsRunning(false);
      setReset(true);
      return;
    } else {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
              }
        )
      );
      setReset(false);
      setIsRunning(true);
    }
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  return (
    <main>
      <h2>Tanzies</h2>
      <Timer reset={reset} isRunning={isRunning} />
      <div className="container">
        {gameWon && (
          <Confetti
            width={window.innerWidth || 300}
            height={window.innerHeight || 200}
          />
        )}
        {diceValue}
      </div>
      <button ref={focusBtn} className="roll" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
