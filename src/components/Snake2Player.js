import React, {Component} from 'react'
import Snake from './Snake';
import Food from './Food';

const getRandomCoordiates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor(((Math.random()*(max-min+1)+min)/2))*2;
  let y = Math.floor(((Math.random()*(max-min+1)+min)/2))*2;
  return [x,y];
}

const initialState ={
    player1: {
        snakeFood: getRandomCoordiates(),
        speed: 100,
        direction: 'RIGHT',
        snakeDots: [
          [0,0],
          [2,0]
        ],
        score: 0,
        gameStart: false
    },
    player2: {
        snakeFood: getRandomCoordiates(),
        speed: 100,
        direction: 'RIGHT',
        snakeDots: [
          [6,6],
          [6,8]
        ],
        score: 0,
        gameStart: false
    }
}

class App2Player extends Component {
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
    }, this.state.player1.speed);
  }

  componentDidUpdate(){
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat(1);
    this.checkIfEat(2);
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode){
      case 38:
        if(this.state.player1.direction !== 'DOWN'){
            this.setState(prevState => ({
                player1: {                   // object that we want to update
                    ...prevState.player1,    // keep all other key-value pairs
                    direction:'UP'     // update the value of specific key
                }
              }));}
        break;
      case 40:
        if(this.state.player1.direction !== 'UP'){
            this.setState(prevState => ({
                player1: {                   // object that we want to update
                    ...prevState.player1,    // keep all other key-value pairs
                    direction:'DOWN'     // update the value of specific key
                }
              }));}
        break;
      case 37:
        if(this.state.player1.direction !== 'RIGHT'){
            this.setState(prevState => ({
                player1: {                   // object that we want to update
                    ...prevState.player1,    // keep all other key-value pairs
                    direction:'LEFT'     // update the value of specific key
                }
              }));}
        break;
      case 39:
        if(this.state.player1.direction !== 'LEFT'){
            this.setState(prevState => ({
                player1: {                   // object that we want to update
                    ...prevState.player1,    // keep all other key-value pairs
                    direction:'RIGHT'     // update the value of specific key
                }
              }));}
        break;
      case 83:
        if(this.state.player2.direction !== 'UP'){
            this.setState(prevState => ({
                player2: {                   // object that we want to update
                    ...prevState.player2,    // keep all other key-value pairs
                    direction:'DOWN'     // update the value of specific key
                }
              }));}
        break;
      case 87:
        if(this.state.player2.direction !== 'DOWN'){
            this.setState(prevState => ({
                player2: {                   // object that we want to update
                    ...prevState.player2,    // keep all other key-value pairs
                    direction:'UP'     // update the value of specific key
                }
              }));}
        break;
      case 68:
        if(this.state.player2.direction !== 'LEFT'){
            this.setState(prevState => ({
                player2: {                   // object that we want to update
                    ...prevState.player2,    // keep all other key-value pairs
                    direction:'RIGHT'     // update the value of specific key
                }
              }));}
        break;
      case 65:
        if(this.state.player2.direction !== 'RIGHT'){
            this.setState(prevState => ({
                player2: {                   // object that we want to update
                    ...prevState.player2,    // keep all other key-value pairs
                    direction:'LEFT'     // update the value of specific key
                }
              }));}
        break;
    }
  }

  checkIfOutOfBorders(){
    let head = this.state.player1.snakeDots[this.state.player1.snakeDots.length - 1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1]<0){
      //this.onGameOver(1);
    }
    head = this.state.player2.snakeDots[this.state.player1.snakeDots.length - 1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1]<0){
      this.onGameOver(2);
    }
  }

  checkIfCollapsed(){
    let snake1 = [...this.state.player1.snakeDots];
    let snake2 = [...this.state.player2.snakeDots];
    let head1 = snake1[snake1.length-1];
    let head2 = snake2[snake2.length-1];

    snake1.pop();
    snake2.pop();
    let body = [...snake1,...snake2];
    body.forEach(dot => {
      if(head1[0] === dot[0] && head1[1] === dot[1]){
        //this.onGameOver(1);
      }
      if(head2[0] === dot[0] && head2[1] === dot[1]){
        this.onGameOver(2);
      }
    })
  }

  checkIfEat(player){
      if(player == 1){

        let head1 = this.state.player1.snakeDots[this.state.player1.snakeDots.length -1];
        let food = this.state.player1.snakeFood;
        if(head1[0] === food[0] && head1[1] === food[1]){
          this.setState(prevState => ({
            player1: {                   // object that we want to update
                ...prevState.player1,    // keep all other key-value pairs
                snakeFood:getRandomCoordiates()      // update the value of specific key
            }
          }));
        
          this.growSnake(1);
          this.raiseSpeed(1);
        }
      }
      else{

        let head2 = this.state.player2.snakeDots[this.state.player2.snakeDots.length -1];
        let food = this.state.player1.snakeFood;

        if(head2[0] === food[0] && head2[1] === food[1]){
          this.setState(prevState => ({
            player1: {                   // object that we want to update
                ...prevState.player1,    // keep all other key-value pairs
                snakeFood:getRandomCoordiates()      // update the value of specific key
            }
          }));
        
          this.growSnake(2);
          this.raiseSpeed(2);
        }
      }
  }

  growSnake(player){
      if(player == 1){
        let newSnake = [...this.state.player1.snakeDots];
        newSnake.unshift([]);
        this.setState(prevState => ({
            player1: {                   
                ...prevState.player1,   
                snakeDots: newSnake,
                score: this.state.player1.score + 1     
            }
          }));
      }
      else{

        let newSnake = [...this.state.player2.snakeDots];
        newSnake.unshift([]);
        console.log(newSnake);
        this.setState(prevState => ({
            player2: {                   
                ...prevState.player2,   
                snakeDots: newSnake,
                score: this.state.player2.score + 1     
            }
        }));
      }
  }

  raiseSpeed(player){
      if(player == 1){

        if(this.state.player1.speed > 10){
            this.setState(prevState => ({
                player1: {                   
                    ...prevState.player1,   
                    speed: this.state.player1.speed - 10   
                }
              }));
        }
      }
    else{
        if(this.state.player2.speed > 10){
            this.setState(prevState => ({
                player2: {                   
                    ...prevState.player2,   
                    speed: this.state.player2.speed - 10   
                }
              }));
        }
    }
  }  

  onGameOver(player){
    alert(`GameOver: player ${player} lost`);
    this.setState(initialState);
  }

  moveSnake = () => {
    let dots1 = [...this.state.player1.snakeDots];
    let head1 = dots1[dots1.length - 1];
    let dots2 = [...this.state.player2.snakeDots];
    let head2 = dots2[dots2.length - 1];

    switch (this.state.player2.direction) {
        case 'RIGHT':
            head2 = [head2[0] + 2, head2[1]];
            break;
        case 'LEFT':
            head2 = [head2[0] - 2, head2[1]];
            break;
        case 'DOWN':
            head2 = [head2[0], head2[1] + 2];
            break;
        case 'UP':
            head2 = [head2[0], head2[1] - 2];
            break;
        }
    
    dots2.push(head2);
    dots2.shift();
    this.setState(prevState => ({
        player2: {                   // object that we want to update
            ...prevState.player2,    // keep all other key-value pairs
            snakeDots:dots2     // update the value of specific key
        }
    }));
    switch (this.state.player1.direction) {
      case 'RIGHT':
        head1 = [head1[0] + 2, head1[1]];
        break;
      case 'LEFT':
        head1 = [head1[0] - 2, head1[1]];
        break;
      case 'DOWN':
        head1 = [head1[0], head1[1] + 2];
        break;
      case 'UP':
        head1 = [head1[0], head1[1] - 2];
        break;
    }

    dots1.push(head1);
    dots1.shift();
    this.setState(prevState => ({
        player1: {                   // object that we want to update
            ...prevState.player1,    // keep all other key-value pairs
            snakeDots:dots1     // update the value of specific key
        }
      }));

  }

  render(){
    return (
    <>
      <div className="App game-area">
         {/* <Snake snakeDots={this.state.player1.snakeDots}></Snake>  */}
        <Snake snakeDots={this.state.player2.snakeDots}></Snake>
        <Food dot={this.state.player1.snakeFood}></Food>
      </div>
      <button onClick={this.gameStart}>Start</button>
    </>
    );
  }
}

export default App2Player;
