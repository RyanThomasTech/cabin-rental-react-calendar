import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component{
    render(){
        const monthLabelArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return(
            <div className='sidebar'>
                <div className='login-container'>
                    <button>Login</button>
                </div>
                <div className='date-info-container'>
                    {
                        //TODO: currently not rendered due to props change
                        this.props.selectedDay > 0 && 
                        <div className='focused-day'>
                            currently focusing {monthLabelArr[this.props.selectedDate.getMonth()]} {this.props.selectedDate.getDate()};
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Sidebar;
