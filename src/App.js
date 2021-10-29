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
    }

    this.setSelectedDate = this.setSelectedDate.bind(this);
  }

  setSelectedDate(dateObj){
    this.setState({
      renderedYear: dateObj.getFullYear(),
      renderedMonth: dateObj.getMonth(),
    })
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
          setSelectedDate={this.setSelectedDate}
        />
      </div>
    );
  }
}

export default App;
