import React from 'react';
import './App.css';
import Calendar from './Calendar';
import './Calendar.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const startDate = new Date();
    this.state = {
      renderedYear: startDate.getFullYear(),
      renderedMonth: startDate.getMonth(),
      squares: Array(42).fill(null),
    }

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(i){
      let squares = this.state.squares.slice();
      squares[i] = 'clicked!';
      this.setState({squares: squares});
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div>A calendar app</div>
        </header>
        <Calendar 
          renderedYear={this.state.renderedYear}
          renderedMonth={this.state.renderedMonth}
          onClickSquare={this.handleClick(i)}
        />
      </div>
    );
  }
}

export default App;
