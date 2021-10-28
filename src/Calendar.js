import React from 'react';
import './Calendar.css';

function Square(props) {
    //function component
    return(
        <button className={props.className} onClick={props.onClick}>
            <span className='day-data'>
                <span className='date-numeral'>{props.dayNumber}</span>
                <span className='rented'>{props.value}</span>
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

    renderSquare(i, dayNumeral){
        let className = 'square';
        if (dayNumeral > 0){
            className += ' active';
        }

        return(
            <Square
                value={this.state.squares[i]}
                onClick={this.handleClick(i)}
                className={className}
                dayNumber={dayNumeral}
            />
        );
    }

    handleOnYearChange(event){
        const selectedValue = event.target.value;
        this.handleSelectDate(selectedValue, this.props.renderedMonth);
    }

    handleSelectDate(year,month){
        this.setState({
            renderedYear: year,
            renderedMonth: month
        })
    }

    handleMonthChangeButton(deltaM){
        let month = this.props.renderedMonth + deltaM;
        let year = this.props.renderedYear;
        if (month > 11){
            month = month - 12;
            year++;
        } else if (month < 0){
            month = month + 12;
            year--;
        }
        this.handleSelectDate(year, month);
    }

    render(){
        let firstDayOfMonth = new Date(this.props.renderedYear, this.props.renderedMonth,1).getDay();   
        let lengthOfMonth = new Date(this.props.renderedYear, this.props.renderedMonth+1, 0).getDate();
        let cal= [];
        let squareNum = 0;
        for (let rowNum = 0; rowNum<6; rowNum++){
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
                    month={this.props.renderedMonth}
                    decrementMonth={()=>this.handleMonthChangeButton(-1)}
                    incrementMonth={()=>this.handleMonthChangeButton(1)}
                    onYearChange={(e)=>this.handleOnYearChange(e)}
                    year={this.props.renderedYear}
                />
                <div className='cal-days'>
                    {cal}
                </div>
            </div>
        )
    }
}

export default Calendar;