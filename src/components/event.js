import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MyMapComponent from './map';

class EventDetails extends Component {
    renderEvent() {
        
        if(Object.keys(this.props.list).length > 0){
            let arr = this.props.list['events'];
            let new_event_list = arr.map((ev,index) => {
                let no = {...ev};
                no.key_id = index;
                
                //compute distance 
                let radlat1 = Math.PI * this.props.uLoc.lat/180;
                let radlat2 = Math.PI * no.latitude/180;
                let theta = this.props.uLoc.long-no.longitude;
                let radtheta = Math.PI * theta/180
                let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist)
                dist = dist * 180/Math.PI
                dist = dist * 60 * 1.1515
                dist = dist.toFixed(2);
                no.distance_from_user = dist;

                return no;
            });
            new_event_list.sort(function(a, b) {
                return a.distance_from_user - b.distance_from_user;
            });
            // console.log('after sort :' ,new_event_list);
            return _.map(new_event_list, post => {
                if(post.key_id == window.location.href.slice(28,window.location.href.length)){
                    let cost='';
                    if(post.cost){cost = 'Cost = $'+post.cost}else cost='Cost not provided';
                    let dt = post.time_start;
                    let date = dt.slice(0,10);
                    let time = dt.slice(11, dt.length);
                    let to = 'event/'+post.key_id;
                    
                    return(
                        <div className="row ebox" key={post.key_id}>
                            <div className="col-md-5 map" >
                            <MyMapComponent
                                lat={post.latitude}
                                lon={post.longitude}
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `35vmin` }} />}
                            />
                            </div>
                            <div className="col-md-7" >
                                <div className="event_box2">
                                    <div className="event_tile2"> 
                                        <div className="title2">{post.name}</div>
                                        <div className="date2">Date:&nbsp;{date}</div>
                                        <div className="time2">Time:&nbsp;{time}</div><br/>
                                        <div className="cost2">{cost}</div>
                                        <div className="dist2">{post.distance_from_user + ' miles'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ); 
                }
                
            });
        }

    }
    render() {
        // console.log(window.location.href.slice(28,window.location.href.length));
        console.log('list in event = ', this.props.list);
        return(
            <div className="row container-fluid event-pg">
            <br/><br/><br/><br/>
                <div className="col-md-12">
                    <center className="ehead">Event Details</center><br/>
                </div>
                <div className="col-md-12">
                    {this.renderEvent()}
                </div>
                
                <div className="col-md-12"><center><Link to="/" className="btn btn-primary top">Go Back</Link></center></div>
            </div>
            
        );
    }
}
function mapStateToProps({ list, uLoc }){
    return {
        list,
        uLoc
    }
}
export default connect(mapStateToProps)(EventDetails);