import React, {Component,useState,useEffect} from 'react'
import Snake from './components/Snake';
import Food from './components/Food';

const getRandomCoordiates = () => {
  let min = 1;
  let max = 90;
  let x = Math.floor(((Math.random()*(max-min+1)+min)/10))*10;
  let y = Math.floor(((Math.random()*(max-min+1)+min)/10))*10;
  return [x,y];
}

const initialState ={
    snakeFood: getRandomCoordiates(),
    speed: 100,
    direction: 'RIGHT',
    snakeDots: [
      [0,0],
      [10,0]
    ],
    score: 0,
    gameStart: false
  }

const App2 = () => {

    const [gameState,setGameState] = useState(initialState);


    return (
    <>
        <div className="App game-area">
        <Snake snakeDots={gameState.snakeDots}></Snake>
        <Food dot={gameState.snakeFood}></Food>
        </div>
        <button>Start</button>
    </>
    );
}

export default App2;
