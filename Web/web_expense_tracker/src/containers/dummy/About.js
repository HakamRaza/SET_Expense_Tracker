import React from 'react';
import Header from '../../components/header';
import './dummy.css';
import Contact from './Contact';

export default class About extends React.Component {
    render(){
        return(
            <div id="about">
                {/* <Header/> */}
                <div id="about-wrap">
                    <div id="about-item">
                        <div id="about-text" >
                            <h1>Okane</h1>
                            <h4>A Leader in Expense Tracking Innovation</h4>

                            <p><b>Okane</b> was founded in 1985 and began publishing software for the Apple Macintosh. Its first product in 1985 was MacAuto, an automotive logbook. In the years to follow, it released FolderJump, FetchIt and KopyKat. Three very popular utilities for the Macintosh.

                            In 1997, Okane released version 5 of MoreInfo, which was to become the best selling version of the software.  MoreInfo continues to be sold today to loyal Newton users.

                            In  of 1998, Okane released its first Palm application, TravelTracker. Since then, TravelTracker has been updated numerous times, the current version being 4. TravelTracker continues to be a popular product and is used by travelers throughout the world.

                            On July 11, 2008, Okane released its first product for the iPhone, TravelTracker.  Inspired by the Palm OS version, the iPhone version is even more powerful and comprehensive than the popular Palm OS version.

                            Okane prides itself it providing great products along with great customer service. We appreciate comments and feedback from all our customers.</p>
                        </div>

                    </div>
                </div>
                <Contact/>
            </div>
        );
    }
}