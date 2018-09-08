import React from 'react';
import {geolocated} from 'react-geolocated';
import { connect } from 'react-redux';

import { locationUpdate } from '../actions';
 
class Demo extends React.Component {
    // updateUserLocation(lat, long){
    //     this.props.locationUpdate(lat, long);
    // }
    componentDidUpdate() {
        if (this.props.coords){
            const loc ={
                lat: this.props.coords.latitude,
                long: this.props.coords.longitude
            }
            if(Object.keys(this.props.uLoc).length == 0){
                this.props.locationUpdate(this.props.coords.latitude, this.props.coords.longitude);
            }
            
        }
    }
    render() {
    if(!this.props.isGeolocationAvailable){
        return <div>Your browser does not support Geolocation</div>;
    }
    else if (!this.props.isGeolocationEnabled){
        return <div>Geolocation is not enabled</div>;
    }
    else if (this.props.coords){
        console.log('location = ',this.props.uLoc);
        return(
            <div >
            <span className="loc">User latitude : {this.props.coords.latitude}; </span>
            <span className="loc">User longitude : {this.props.coords.longitude}</span>
            </div>      
        );
    }
    else {
        return <div className="loc">Getting the location data&hellip; </div>;
    }
    }
}

function mapStateToProps({ uLoc }) {
    return {
        uLoc
    }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(
    connect(mapStateToProps, { locationUpdate })(Demo)
);