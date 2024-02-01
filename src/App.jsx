import { useEffect, useState } from "react";
import "./App.css";
import Square from "./Square";

function App() {
  let status;

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerScores, setPlayerScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    let score = localStorage.getItem("score");
    if (score) {
      score = JSON.parse(score);
      setPlayerScores(score);
    }
  }, []);

   
  if (calculateWinner(squares) === null && !squares.includes(null)) {  //when the game draws
    status = "It is a Draw";
    alert(status)
    setTimeout(() => {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
    }, 1000);
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);

  if (winner) {
    status = "Winner: " + winner;
    setTimeout(() => resetGame(), 500); //or else the wining move wouldnt be visible
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);

    if (winner === "X") {
      const scores = { ...playerScores, X: playerScores.X + 1 };
      setPlayerScores(scores);
      localStorage.setItem("score", JSON.stringify(scores));
    } else if (winner === "O") {
      const scores = { ...playerScores, O: playerScores.O + 1 };
      setPlayerScores(scores);
      localStorage.setItem("score", JSON.stringify(scores));
    }
    // localStorage.setItem('score', JSON.stringify(playerScores))
  }

  return (
    <div div className="max-w-[400px] flex flex-col gap-4 scale-[1.5]">
      <div className="flex gap-3 justify-center">
        <div><span  className="font-semibold text-lg text-blue-500">O:</span> {playerScores.O}</div>
        <div> <span className="font-semibold text-lg text-red-500" >X:</span> {playerScores.X}</div>
      </div>
      <div className="grid grid-cols-3">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
          <Square onSquareClick={() => handleClick(i)} value={squares[i]} />
        ))}
      </div>
      <div className="status">{status}</div>
      
    </div>
  );
}

export default App;


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
