import React, {useState} from 'react';
import './Sidebar.css';
import BookingWindow from './BookingWindow.js';

const monthLabelArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function DateInfo(props){
    let [clickCount, setClickCount] = useState(0);

    function handleDeleteClick(){
        setClickCount(++clickCount);
        if (clickCount > 1){
            setClickCount(0);
            props.DELETERental(props.selectedRental);
        }
    }

    return(
        <div>
        {
            (typeof props.selectedRental === 'object') &&
            <div className='selected-rental-info'>
                Rental on {monthLabelArr[props.renderedDate.getMonth()]} {props.renderedDate.getDate()} :
                <br />
                Rented to: {props.selectedRental.rentedTo}
                <br />
                Approved by: {props.selectedRental.rentedBy}
                <div className='admin-buttons'>
                    <button onClick={handleDeleteClick}>Delete</button>
                    <button>Edit</button>
                    {
                        clickCount > 0 &&
                        <div className="select-warning">Click again to confirm deletion of rental</div>
                    }
                </div>
            </div>
        }
        </div>
    )
}

function Sidebar(props){
    let [booking, setBooking] = useState(false);
    let innerContent;
    if (booking){
        innerContent = <BookingWindow 
            renderedDate = {props.renderedDate}
            POSTRental = {props.POSTRental}/>
    } else {
        innerContent = <DateInfo
            renderedDate = {props.renderedDate}
            selectedRental = {props.selectedRental}
            DELETERental = {props.DELETERental}
        />
    }

    return(
        <div className='sidebar'>
            <div className='buttons-container'>
                <button>Login</button>
                <button onClick={ ()=>{setBooking(booking = !booking) }}>Book a Rental</button>
            </div>
            <div className='date-info-container'>
                {innerContent}
            </div>
        </div>
    )
}

export default Sidebar;
