import React, {useState, useEffect} from 'react';
import './Sidebar.css';

function Sidebar(props){
    const monthLabelArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return(
        <div className='sidebar'>
            <div className='login-container'>
                <button>Login</button>
            </div>
            <div className='date-info-container'>
                {
                    typeof props.selectedRental === 'object' && 
                    <div className='selected-rental-info'>
                        Rental on {monthLabelArr[props.selectedDate.getMonth()]} {props.selectedDate.getDate()} :
                        <br />
                        Rented to: {props.selectedRental.rentedTo}
                        <br />
                        Approved by: {props.selectedRental.rentedBy}
                    </div>
                }
            </div>
        </div>
    )
}

export default Sidebar;
