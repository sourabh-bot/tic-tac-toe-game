import { useState } from "react"

export default function GameBoard({ onsSelectSqure, board }) {

    

    // const [gameBoard, setGameBoard] = useState(initialValues);

    // const handleSelectSequre = (rowIndex, colIndex)=>{
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard = [...prevGameBoard.map(innerArray=>[...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return  updatedBoard;
    //     });

    //     onsSelectSqure();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}> 
                    <ol>{row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={()=>onsSelectSqure(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li>)} 
                    </ol>
                </li>
            ))}
        </ol>
    )
} 