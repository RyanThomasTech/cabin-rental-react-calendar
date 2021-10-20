import React from 'react';
import './Calendar.css';

function Square(props) {
    //function component
    return(
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(42).fill(null)
        };
    }

    renderSquare(i, active){
        let className = 'square';
        if (active === 1){
            className += ' active';
        }

        return(
            <Square
                value={this.state.squares[i]}
                onClick={()=>this.handleClick(i)}
                className={className}
            />
        );
    }

    handleClick(i){
        let squares = this.state.squares.slice();
        squares[i] = 'clicked!';
        this.setState({squares: squares});
    }

    render(){
        const firstDayOfMonth = new Date(2021, new Date().getMonth(),1).getDay();   //TODO: remove hardcoded year
        const lengthOfMonth = new Date(2021, new Date().getMonth()+1, 0).getDate();
        let cal= [];
        let squareNum = 0;
        for (let rowNum = 0; rowNum<6; rowNum++){
            let row = [];
            for (let colNum = 0; colNum<7; colNum++){
                row.push((squareNum >= firstDayOfMonth && squareNum <= firstDayOfMonth+lengthOfMonth) ? this.renderSquare(squareNum, 1) : this.renderSquare(squareNum, 0));
                squareNum++;
            }
            cal.push(<div className='cal-row'>{row}</div>);
        }

        return(
            <div className='calendar'>
                <div className='cal-month' />
                <div className='cal-days'>
                    {cal}
                </div>
            </div>
        )
    }
}

export default Calendar;