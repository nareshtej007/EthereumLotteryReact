import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component { 
  
  //constructor(props) {
    //super(props);

    state = { 
      manager: '',
      players: [],
      balance: '',
      value: '',
      message: ''
    };
  //}
   async componentDidMount() {// this calls automatically when ever application starts
    const manager =  await lottery.methods.manager().call(); //we have to tell in call function { from: accouts[0] } but now it is not required the would undertake this situation
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState( { manager, players, balance });
  }
onSubmit = async (event) =>{
 event.preventDefault();

 const accouts = await web3.eth.getAccounts();

 this.setState({ message: 'waiting on transaction success...'});

 await lottery.methods.enter().send({
   from: accouts[0],
   value: web3.utils.toWei(this.state.value, 'ether')
 });

 this.setState({message: 'you have been entered!'}) ;
};

onClick = async () => {

  const accounts = await web3.eth.getAccounts();

  this.setState({message: 'Waiting on transacton success'});

  await lottery.methods.pickWinner().send({
    from: accounts[0]
  });
  this.setState({message: 'A winner has been picked'});
};
  render() {// this calls first and put it on screen
   //web3.eth.getAccounts().then(console.log)// console log show which ever produced by the .then
    return (
  <div> 
   <h2> Lottery Contract </h2>
   <p> This contract is managed by {this.state.manager}.
       There are currently {this.state.players.length} people entered,
       competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ehter!
    </p>
    <hr />
    
    <form onSubmit = {this.onSubmit}>
      <h4> Want to try your luck? </h4>
      <div>
        <label>Amount of ehter to enter</label>
        <input
            value = {this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
        />
        </div>
        <button>Enter </button>
      </form>
      <hr/>

<h4> Ready to pick a winner?</h4>
<button onClick={this.onClick}> Pick a Winner! </button>
      <hr />
      
      <h1> {this.state.message}</h1>  
  </div>
    );
  }
}

export default App;



