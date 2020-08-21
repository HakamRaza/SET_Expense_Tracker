import React from 'react';
import './modal.css';

const color=['lightgreen', 'lightblue', 'lightpink','lightgray', 'lightcyan']

export default class Modal extends React.Component {
    render(){
        return(
            <div className="modal-bg">
                <div className="modal-form">
                    <h2 className="modal-close" onClick={this.props.onclick}>X</h2>
                    <p>Name :</p>
                    <input type="text" placeholder="Categories Name"/>
                    <p>Budget:</p>
                    <input type="text" placeholder="Categories Budget"/>
                    <p>Choose Color: </p>
                    <div className="color-holder">
                        {color.map(item=>(<div className='color-cont' style={{backgroundColor:item}}></div>))}
                    </div>
                    <button>ADD</button>
                    
                </div>
            </div>
        );
    }
}