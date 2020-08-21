import React from 'react';
import './filtering.css';

export default class FilterBar extends React.Component{
    render(){
        return(
            <div>
                <p>Search Parameter: </p>
                <div className='filter-container'>
                    <div className="filter-holder">
                        <div className="filter-form">Categories Select</div>
                        <div className="filter-form">Start Date Select</div>
                        <div className="filter-form">End Date Select</div>
                        <div className="filter-form">Less Than Search</div>
                        <div className="filter-form">More Than Search</div>
                        <div className="filter-form">Description Search</div>
                    </div>
                    <div className="filbut-holder">
                        <button className="filter-button">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}