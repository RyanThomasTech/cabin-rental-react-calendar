import React from 'react';
import './App.css';
import Calendar from './Calendar';
import './Calendar.css';
import Sidebar from './Sidebar';

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

  setSelectedDate(dateObj, clickCount){
    this.setState({
      renderedYear: dateObj.getFullYear(),
      renderedMonth: dateObj.getMonth(),
      selectedDay: dateObj.getDate(),
      lastClickedSquareVal: clickCount,
    })
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div>A calendar app</div>
        </header>
        <div className="App-body">
          <Calendar 
            renderedYear={this.state.renderedYear}
            renderedMonth={this.state.renderedMonth}
            setSelectedDate={this.setSelectedDate}
          />
          <Sidebar
            selectedDay={this.state.selectedDay}
            renderedMonth={this.state.renderedMonth}
            lastClickedSquareVal={this.state.lastClickedSquareVal}
          />
        </div>
      </div>
    );
  }
}

export default App;
