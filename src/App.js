import { useState } from "react";
import Button from "./components/Button";
import HandButton from "./components/HandButton";
import HandIcon from "./components/HandIcon";
import { compareHand, generateRandomHand } from "./utils/utils";
import "./styles/App.css";
import Score from "./components/Score";

const INITIAL_VALUE = "rock";

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div className='App'>
      <h1 className='App-heading'>가위바위보</h1>
      <Button onClick={handleClearClick}>처음부터</Button>
      <div className='App-scores'>
        <Score score={score}>나</Score>
        <div className='App-versus'>:</div>
        <Score score={otherScore}>상대</Score>
      </div>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <div>
        <input type='number' value={bet} min={1} max={9} onChange={handleBetChange}></input>
      </div>
      <p>승부 기록: {gameHistory.join(", ")}</p>
      <div>
        <HandButton value='rock' onClick={handleButtonClick} />
        <HandButton value='scissor' onClick={handleButtonClick} />
        <HandButton value='paper' onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
