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
      selectedDate: startDate,
      rentals: Array(this.getRentalArrayLength(startDate)).fill(0),
    }

    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.handleBookRental = this.handleBookRental.bind(this);
  }

  getRentalArrayLength(dateObj){
    const threeMonthLength = (
      new Date(dateObj.getFullYear(),dateObj.getMonth(),0).getDate() +
      new Date(dateObj.getFullYear(),dateObj.getMonth()+1,0).getDate() +
      new Date(dateObj.getFullYear(),dateObj.getMonth()+2,0).getDate()
    );
    return threeMonthLength;
  }

  componentDidMount(){
    this.fetchDataByMonth();
  }

  fetchDataByMonth(/*dateObj*/){
    //TODO: grab rentals by specific timeframe only
    fetch('http://localhost:8080/rentals')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((jsonArr) => {
      this.handleRentalsData(jsonArr)
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }

  handleRentalsData(jsonArr){
    const currentMonth = this.state.selectedDate.getMonth();
    const currentMonthLength = new Date(this.state.selectedDate.getFullYear(), currentMonth+1, 0).getDate();
    const prevMonth = (currentMonth-1 + 12) % 12;
    const prevMonthLength = new Date(this.state.selectedDate.getFullYear(), currentMonth, 0).getDate();
    const nextMonth = (currentMonth+1 + 12) % 12;
    let rentals = Array(this.getRentalArrayLength(this.state.selectedDate)).fill(0);
   
    for (const rentalObj of jsonArr){
      const rentalDate = new Date(rentalObj.date);
      switch(rentalDate.getMonth()){
        case (prevMonth):
          rentals[rentalDate.getDate()-1] = rentalObj;
          break;
        case (currentMonth):
          rentals[rentalDate.getDate()-1+prevMonthLength] = rentalObj;
          break;
        case (nextMonth):
          rentals[rentalDate.getDate()-1+prevMonthLength+currentMonthLength] = rentalObj;
          break;
        default:
          console.log("Todo: tests and error handling")
          break;
      }
    };

    const offsetFromPrevMonth = new Date(this.state.selectedDate.getFullYear(), currentMonth, 1).getDay();

    //TODO: test this math
    rentals = rentals.slice(prevMonthLength-offsetFromPrevMonth, prevMonthLength-offsetFromPrevMonth+(6*7)+1);

    this.setState({
      rentals: rentals,
    })
  }

  setSelectedDate(dateObj){
    //TODO: fetch month-specific data
    //only fetch new data if a new month/year is being accessed, not new day
    if (dateObj.getMonth() !== this.state.selectedDate.getMonth() ||
      dateObj.getFullYear() !== this.state.selectedDate.getFullYear() ){
      this.fetchDataByMonth();
    }
    this.setState({
      selectedDate: dateObj,
    })
  }

  handleBookRental(dateObj){
    //TODO: POST 
    console.log("Book rental for: " + dateObj);
  }
  
  render(){
    const offsetFromPrevMonth = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), 1).getDay();
    const selectedRentalIndex = offsetFromPrevMonth + this.state.selectedDate.getDate() - 1;


    return (
      <div className="App">
        <header className="App-header">
          <div>A calendar app</div>
        </header>
        <div className="App-body">
          <Calendar 
            selectedDate={this.state.selectedDate}
            setSelectedDate={this.setSelectedDate}
            rentals={this.state.rentals}
          />
          <Sidebar
            selectedDate={this.state.selectedDate}
            selectedRental={this.state.rentals[selectedRentalIndex]}
            handleBookRental={this.handleBookRental}
          />
        </div>
      </div>
    );
  }
}

export default App;
