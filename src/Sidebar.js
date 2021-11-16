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
                        this.props.selectedDay > 0 && 
                        <div className='focused-day'>
                            currently focusing {monthLabelArr[this.props.renderedMonth]} {this.props.selectedDay}, this square has been clicked {this.props.lastClickedSquareVal} times;
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Sidebar;
