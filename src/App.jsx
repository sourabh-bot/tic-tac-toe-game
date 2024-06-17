import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const derivedGamePlayer = (turns) => {
  let currentPlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

const derivedWinner = (gameBoard, players) => {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

const derivedGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map(item => [...item])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedGamePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSequre = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      let currentPlayer = derivedGamePlayer(prevTurns);
      const updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        },
        player: currentPlayer
      }, ...prevTurns];
      return updatedTurns;
    });
  }

  const handlePlayerName = (symbol, playerName) => {
    setPlayers(previousPlayers => {
      return {
        ...previousPlayers,
        [symbol]: playerName
      }
    });
  }

  const handleReset = () => {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="hightlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerName} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerName} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReset={handleReset} />}
        <GameBoard onsSelectSqure={handleSelectSequre} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
