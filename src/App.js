import React, {Component} from 'react'
import Snake from './Snake';
import Food from './Food';

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

class App extends Component {
  constructor(props){
    super(props);
    this.gameStart = this.gameStart.bind(this);
  }
  state = initialState

  componentDidMount(){
    document.onkeydown = this.onKeyDown;
  }

  gameStart(){
    this.gameStart = setInterval(() => {
      this.moveSnake()
    }, this.state.speed);
  }

  componentDidUpdate(){
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }
  componentWillUnmount() {
    clearInterval(this.gameStart);
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode){
      case 38:
        if(this.state.direction !== 'DOWN')this.setState({direction:'UP'});
        break;
      case 40:
        if(this.state.direction !== 'UP')this.setState({direction:'DOWN'});
        break;
      case 37:
        if(this.state.direction !== 'RIGHT')this.setState({direction:'LEFT'});
        break;
      case 39:
        if(this.state.direction !== 'LEFT')this.setState({direction:'RIGHT'});
        break;
      case 83:
        if(this.state.direction !== 'DOWN')this.setState({direction:'UP'});
        break;
      case 87:
        if(this.state.direction !== 'UP')this.setState({direction:'DOWN'});
        break;
      case 68:
        if(this.state.direction !== 'RIGHT')this.setState({direction:'LEFT'});
        break;
      case 65:
        if(this.state.direction !== 'LEFT')this.setState({direction:'RIGHT'});
        break;
    }
  }

  checkIfOutOfBorders(){
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1]<0){
      this.onGameOver();
    }
  }

  checkIfCollapsed(){
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length-1];
    snake.pop();
    snake.forEach(dot => {
      if(head[0] === dot[0] && head[1] === dot[1]){
        this.onGameOver();
      }
    })
  }

  checkIfEat(){
    let head = this.state.snakeDots[this.state.snakeDots.length -1];
    let food = this.state.snakeFood;
    if(head[0] === food[0] && head[1] === food[1]){
      this.setState({
        snakeFood:getRandomCoordiates()
      });
      this.growSnake();
      this.raiseSpeed();
    }
  }

  growSnake(){
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
      score: this.state.score + 1
    })
  }

  raiseSpeed(){
    if(this.state.speed > 10){
      this.setState({speed: this.state.speed - 10});
    }
  }  

  onGameOver(){
    alert(`GameOver: you got me ${this.state.score} times <3`);
    this.setState(initialState);
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 10, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 10, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 10];
        break;
      case 'UP':
        head = [head[0], head[1] - 10];
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots:dots
    })
  }

  render(){
    return (
    <>
      <div className="App game-area">
        <Snake snakeDots={this.state.snakeDots}></Snake>
        <Food dot={this.state.snakeFood}></Food>
      </div>
      <button onClick={this.gameStart}>Start</button>
    </>
    );
  }
}

export default App;
