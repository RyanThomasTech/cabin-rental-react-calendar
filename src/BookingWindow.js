import React, {useState} from 'react';
import './BookingWindow.css';

const monthLabelArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function YearSelect(props){
    const currentYear = new Date().getFullYear();
    let optionsYears = Array(3).fill(0).map((element, index) => {
        return <option key={index} value={currentYear + index}>{currentYear + index}</option>
    });

    return(
        <span className="select-container">
            <label for="year">Year:</label>
            <select name="year" onChange={props.onChange}>
                {optionsYears}
            </select>
        </span>
    )

}

function DaySelect(props){
    const daysInMonth = new Date(props.selectedYear,props.selectedMonth+1,0).getDate();
    let optionsDays = Array(daysInMonth).fill(0).map((element, index) => {
        return <option key={index} value={index+1}>{index+1}</option>
    });

    return(
        <span className="select-container">
            <label for="day">Day:</label>
            <select name="day" onChange={props.onChange}>
                {optionsDays}
            </select>
        </span>
    )
}

function MonthSelect(props){
    let optionsMonths = monthLabelArr.map((label, index) => {
        return <option value={index} key={index}>{label}</option>
    });
        
    return(
        <span className="select-container">
            <label for="month">Month:</label>
            <select name="month" onChange={props.onChange}>
                {optionsMonths}
            </select>
        </span>
    )
}

function RentedToInput(props){
    return(
        <div>
            <label for="RentedTo">Rented To: </label>
            <input
                id="RentedTo"
                name="RentedTo"
                onChange={props.onChange}
            ></input>
        </div>
    )
}

function BookingWindow(props){
    const [selectedYear, setYear] = useState(props.renderedDate.getFullYear());
    const [selectedMonth, setMonth] = useState(props.renderedDate.getMonth());
    const [selectedDay, setDay] = useState(props.renderedDate.getDate());
    const [inputRentedTo, setRentedTo] = useState("Guest");

    function handleMonthChange(e){
        setMonth(e.target.value);
    }

    function handleYearChange(e){
        setYear(e.target.value);
    }

    function handleDayChange(e){
        setDay(e.target.value);
    }

    function handleRentedToInput(e){
        setRentedTo(e.target.value);
    }

    function handleSubmitClick(){
        const newDate = new Date(selectedYear, selectedMonth, selectedDay);

        //confirm that booking is for a future date
        if (newDate >= props.renderedDate){
            props.POSTRental(newDate,inputRentedTo);
        } else {
            alert("Please select a date in the future to book your rental");
        }
    }

    return(
        <div className="booking-window">
            <YearSelect onChange={(event)=>handleYearChange(event)}/>
            <MonthSelect onChange={(event)=>handleMonthChange(event)}/>
            <DaySelect 
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onChange={(event)=>handleDayChange(event)}
            />
            {
                (new Date(selectedYear, selectedMonth, selectedDay) < props.renderedDate) && 
                <div className="select-warning">Please select a future date.</div>
            }
            <RentedToInput onChange={(event)=>handleRentedToInput(event)}/>
            {
                (inputRentedTo === 'Guest') && 
                <div className="select-warning">Please provide the name to whom the cabin is being rented.</div>
            }
            <br />
            <button onClick={handleSubmitClick}>Submit</button>
        </div>
    )
}

export default BookingWindow