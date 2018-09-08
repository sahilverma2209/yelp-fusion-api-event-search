import React, {Component} from 'react';

import EventList from './event_list';
import Demo from './geolocation';

class Home extends Component {
    render(){
        return(
            <div>
                <Demo/>
                <EventList/>
            </div>
        );
    }
}

export default Home;