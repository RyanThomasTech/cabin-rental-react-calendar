import React from 'react';
import './Calendar.css';

function Square(props) {
    //function component
    return(
        <button className={props.className} onClick={props.onClick}>
            <span className='day-data'>
                <span className='date-numeral'>{props.dayNumber}</span>
                <span className='rented'></span>
            </span>
        </button>
    );
}

function YearSelect(props){
    return(
        <div className='yearSelect-container'>
            <input type='number' id='year-input' onChange={props.onChange} value={props.year}></input>
        </div>
    )
}

function MonthBar(props){
    const monthLabelArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return(
        <div className='cal-header'>
            <button className='change-month-button' onClick={props.decrementMonth}>&larr;</button>
            <div className='month-year'>
                <span className='month-name'>{monthLabelArr[props.month]}</span>
                <YearSelect 
                    year={props.year}
                    onChange={props.onYearChange}
                />
            </div>
            <button className='change-month-button' onClick={props.incrementMonth}>&rarr;</button>
        </div>
    );
}

class Calendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(6*7).fill(0),
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const rentals = this.props.rentals.slice();
        const newSquares = rentals.map(el => {
            return ((typeof el === 'object') ? 1 : 0);
        })

        this.setState({
            squares: newSquares,
        })
    }

    componentDidUpdate(prevProps){
        if (prevProps.rentals !== this.props.rentals){
            const rentals = this.props.rentals.slice();
            const newSquares = rentals.map(el => {
                return ((typeof el === 'object') ? 1 : 0);
            })
            console.log("updated");

            this.setState({
                squares: newSquares,
            })
        }

    }

    renderSquare(i, dayNumeral){
        let className = 'square';
        if (this.state.squares[i] > 0){
            className += ' rented';
        }
        else if (dayNumeral > 0){
            className += ' active';
        }

        return(
            <Square
                value={this.state.squares[i]}
                onClick={this.handleClick.bind(this, i)}
                className={className}
                dayNumber={dayNumeral}
            />
        );
    }

    handleClick(i){
        const firstDayOfMonth = new Date(this.props.selectedDate.getFullYear(), this.props.selectedDate.getMonth(),1).getDay();
        const outputDate = new Date(this.props.selectedDate.getFullYear(), this.props.selectedDate.getMonth(), i - firstDayOfMonth + 1);
        this.props.setSelectedDate(outputDate);
        
    }

    handleOnYearChange(event){
        const selectedYear = event.target.value;
        const outputDate = new Date(selectedYear, this.props.selectedDate.getMonth());
        this.props.setSelectedDate(outputDate);
    }

    handleMonthChangeButton(deltaM){
        let month = this.props.selectedDate.getMonth() + deltaM;
        let year = this.props.selectedDate.getFullYear();
        if (month > 11){
            year++;
        } else if (month < 0){
            year--;
        }
        month = (month + 12) % 12;
        const outputDate = new Date(year,month);
        this.props.setSelectedDate(outputDate);
    }

    render(){
        let firstDayOfMonth = new Date(this.props.selectedDate.getFullYear(), this.props.selectedDate.getMonth(),1).getDay();   
        let lengthOfMonth = new Date(this.props.selectedDate.getFullYear(), this.props.selectedDate.getMonth()+1, 0).getDate();
        let cal= [];
        let squareNum = 0;
        for (let rowNum = 0; rowNum<(firstDayOfMonth < 5 ? 5 : 6); rowNum++){
            let row = [];
            for (let colNum = 0; colNum<7; colNum++){
                row.push(
                        (squareNum >= firstDayOfMonth && squareNum < firstDayOfMonth+lengthOfMonth) ? this.renderSquare(squareNum, squareNum-firstDayOfMonth+1) : this.renderSquare(squareNum, 0)
                    );
                squareNum++;
            }
            cal.push(<div className='cal-row'>{row}</div>);
        }

        return(
            <div className='calendar'>
                <MonthBar 
                    month={this.props.selectedDate.getMonth()}
                    decrementMonth={()=>this.handleMonthChangeButton(-1)}
                    incrementMonth={()=>this.handleMonthChangeButton(1)}
                    onYearChange={(e)=>this.handleOnYearChange(e)}
                    year={this.props.selectedDate.getFullYear()}
                />
                <div className='cal-days'>
                    {cal}
                </div>
            </div>
        )
    }
}

export default Calendar;