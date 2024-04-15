import { useEffect, useState } from 'react';
import Tile from '../Tile/Tile';
import './Board.css';

function Board() {
    const initialGrid = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    const [grid, setGrid] = useState(initialGrid);
    const [newGame, setGame] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [score,setScore] = useState(0);
    const [bscore,setBScore] = useState(window.localStorage.bscore)
    
    if (newGame) {
        let i1 = Math.floor(Math.random() * 4);
        let j1 = Math.floor(Math.random() * 4);
        let i2 = Math.floor(Math.random() * 4);
        let j2 = Math.floor(Math.random() * 4);
        let n1 = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
        let n2 = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
        const newGrid = grid.map((r, rind) => {
            return r.map((c, cind) => {
                if (rind === i1 && cind === j1)
                    return n1;
                if (rind === i2 && cind === j2)
                    return n2;
                return 0;
            })
        })
        setGrid(newGrid)
        setGame(false)
    }

    
    useEffect(() => {
        const checkIfGameOver = () => {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++)
                    if (grid[i][j] === 0) return false;
            }
            for (let i = 1; i < 3; i++) {
                for (var j = 1; j < 3; j++) {
                    let n = grid[i][j]
                    if (n === grid[i + 1][j] || n === grid[i - 1][j] || n === grid[i][j + 1] || n === grid[i][j - 1])
                        return false;
                }
            }
            let n = grid.length - 1;
            for (let i = 1; i < 3; i++) {
                if (grid[i][0] === grid[i - 1][0] || grid[i][0] === grid[i + 1][0]) return false;
                if (grid[i][n] === grid[i - 1][n] || grid[i][n] === grid[i + 1][n]) return false;
                if (grid[0][i] === grid[0][i - 1] || grid[0][i] === grid[0][i + 1]) return false;
                if (grid[n][i] === grid[n][i - 1] || grid[n][i] === grid[n][i + 1]) return false;
            }
            setBScore(Math.max(score,bscore===undefined?0:bscore))
            setGameOver(true);
            return true;
        }
    
        const isPossible = (tiles) => {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++)
                    if (tiles[i][j] === 0) return true;
            }
            return false;
        }
    
        const addNewTile = (tiles,inc) => {
            let i = Math.floor(Math.random() * 4);
            let j = Math.floor(Math.random() * 4);
            let n = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
            
            if (!isPossible(tiles)) return
            
            while (tiles[i][j] !== 0 && !gameOver) {
                i = Math.floor(Math.random() * 4);
                j = Math.floor(Math.random() * 4);
            }
            tiles[i][j] = n;
            
            setScore(score+inc)
            setGrid(tiles)
        }
    
        const moveRight = () => {    
            const newGrid = [];
            let inc=0;
            let flag=false;
            for(var i=0;i<4;i++){
                let temp = new Array(4).fill(0);
                var p1 = grid.length-1, p2 = grid.length-2;
                temp[p1] = grid[i][p1];
                while (p2 >= 0) {
                    if (grid[i][p2] === 0) p2--;
                    else {
                        if (grid[i][p2] === temp[p1]) {
                            temp[p1] *= 2;
                            inc+=temp[p1];
                            p1--; p2--;flag=true;
                        }
                        else if (temp[p1] === 0) {
                            temp[p1] = grid[i][p2];
                            if(p1!==p2){flag=true;}
                            p2--;
                        }
                        else {
                            p1--;
                        }
                    }
                }
                newGrid.push(temp)
            }

            if(flag)addNewTile(newGrid,inc)
        }
        const moveLeft = () => {
            const newGrid = [];
            let inc=0;
            let flag=false;
            for(var i=0;i<4;i++){
                let temp = new Array(4).fill(0);
                var p1 = 0, p2 = 1;
                temp[0] = grid[i][0];
                while (p2 < grid.length) {
                    if (grid[i][p2] === 0) p2++;
                    else {
                        if (grid[i][p2] === temp[p1]) {
                            temp[p1] *= 2;
                            inc+=temp[p1];
                            p1++; p2++;flag=true;
                        }
                        else if (temp[p1] === 0) {
                            temp[p1] = grid[i][p2];
                            if(p1!==p2){flag=true;}
                            p2++;
                        }
                        else {
                            p1++;
                        }
                    }
                }
                newGrid.push(temp)
            }
            
            if(flag)addNewTile(newGrid,inc)
        }
        const moveUp = () => {
            const newGrid = [];
            let inc=0;
            let flag=false;
            for (var i = 0; i < 4; i++) {
                let temp = new Array(4).fill(0);
                var p1 = 0, p2 = 1;
                temp[0] = grid[0][i];
                while (p2 < grid.length) {
                    if (grid[p2][i] === 0) p2++;
                    else {
                        if (grid[p2][i] === temp[p1]) {
                            temp[p1] *= 2;
                            inc+=temp[p1];
                            p1++; p2++;flag=true;
                        }
                        else if (temp[p1] === 0) {
                            temp[p1] = grid[p2][i];
                            if(p1!==p2){flag=true;}
                            p2++;
                        }
                        else {
                            p1++;
                        }
                    }
                }
                newGrid.push(temp)
            }
            const transpose = newGrid[0].map((col, ind) => {
                return newGrid.map((row) => {
                    return row[ind]
                })
            })
            if(flag)addNewTile(transpose,inc)
        }
        const moveDown = () => {
            const newGrid = [];
            let inc=0;
            let flag=false;
            for (var i = 0; i < 4; i++) {
                let temp = new Array(4).fill(0);
                var p1 = grid.length - 1, p2 = grid.length - 2;
                temp[p1] = grid[p1][i]
                while (p2 >= 0) {
                    if (grid[p2][i] === 0) p2--;
                    else {
                        if (grid[p2][i] === temp[p1]) {
                            temp[p1] *= 2;
                            inc+=temp[p1];
                            p1--; p2--;
                            flag=true;
                        }
                        else if (temp[p1] === 0) {
                            temp[p1] = grid[p2][i];
                            if(p1!==p2)flag=true;
                            p2--;
                        }
                        else {
                            p1--;
                        }
                    }
                }
                newGrid.push(temp)
            }
            const transpose = newGrid[0].map((col, ind) => {
                return newGrid.map((row) => {
                    return row[ind]
                })
            })
            if(flag)addNewTile(transpose,inc)
        }
        const handleKeyEvent = (e) => {
            if (gameOver) return;
            switch (e.key) {
                case "ArrowRight":
                    moveRight();
                    return;
                case "ArrowLeft":
                    moveLeft(); return;
                case "ArrowUp":
                    moveUp(); return;
                case "ArrowDown":
                    moveDown(); return;
                default: return;
            }
        }
        checkIfGameOver()
        window.addEventListener('keydown', handleKeyEvent);
        return () => window.removeEventListener('keydown', handleKeyEvent);
    }, [grid, gameOver])
    
    return (
        <div>
            <h1>2048 Game</h1>
            <div className="stats">
                <div className="scoreBoard">
                <h5>
                    Score: {score}
                </h5>
                <button 
                    className="reset" 
                    onClick={() => { 
                        setGrid(initialGrid); 
                        setScore(0);  
                        setBScore(Math.max(score,bscore===undefined?0:bscore)); 
                        setGame(true); 
                        setGameOver(false);
                        window.localStorage.setItem("bscore",Math.max(score,bscore===undefined?0:bscore));
                    }}>
                        Reset
                </button>
                </div>
                <h5>
                    Best Score: {bscore===undefined?0:bscore}
                </h5>
            </div>
            <div className="mainBoard">
                <div className="grid">
                    {grid.map((row, ind) => {
                        return <div className="boardRow" key={ind}>{row.map((col, ind) => {
                            return <div className="boardCol" key={ind}></div>
                        })}
                        </div>
                    })}
                </div>
                <div className="tileGrid">
                    {grid.map((row, ind) => {
                        return <div className="boardRow" key={ind}>{row.map((col, ind) => {
                            return <Tile num={col} key={ind} />
                        })}
                        </div>
                    })}
                </div>
                {gameOver && <div className="gameOver">
                    <h2>Game Over!</h2>
                    <button className="tryAgain" 
                        onClick={() => { 
                            setGrid(initialGrid); 
                            setScore(0); 
                            setBScore(Math.max(score,bscore===undefined?0:bscore)); 
                            setGame(true); 
                            setGameOver(false);
                            window.localStorage.setItem("bscore",Math.max(score,bscore===undefined?0:bscore));
                            }}>
                                Try Again
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default Board;