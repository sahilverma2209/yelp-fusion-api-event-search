import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchList, locationChange } from '../actions';

class EventList extends Component {
    
    formSubmit(event){
        event.preventDefault();
        this.props.fetchList(this.props.input);
    }

    renderList(){
       
        if(Object.keys(this.props.list).length > 0 && Object.keys(this.props.uLoc).length > 0){
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
                let cost='';
                if(post.cost){cost = 'Cost = $'+post.cost}else cost='Free entry';
                let dt = post.time_start;
                let date = dt.slice(0,10);
                let time = dt.slice(11, dt.length);
                let to = 'event/'+post.key_id;
                return(
                    <Link to={to} key={post.key_id} className="black">
                        <div className="col-md-4 col-sm-6 " >
                            <div className="event_box">
                                <div className="event_tile"> 
                                    <div className="title">{post.name}</div>
                                    <div className="date">Date:&nbsp;{date}</div>
                                    <div className="time">Time:&nbsp;{time}</div><br/>
                                    <div className="cost">{cost}</div>
                                    <div className="dist">{post.distance_from_user + ' miles'}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ); 
            });
        }
    }
    render() {
        let newVal = this.props.input;
        return (
            <div className="main_app container-fluid A">

                <div className="row B">
                    <div className="col-md-10 col-md-offset-1"><br/>
                    <center>
                        <form onSubmit={this.formSubmit.bind(this)} className="form-inline">
                            <input
                                className="form-control"
                                value={newVal} 
                                name="loc"
                                type="text"
                                placeholder="Enter a location"
                                onChange={e => { this.props.locationChange(e.target.value); }}
                            />&nbsp;
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </center><br/>
                    </div>
                </div>

                <div className="row">
                yolo
                    {this.renderList()}
                </div>

            </div>
        );
    }
}
function mapStateToProps({ list, input, uLoc }) {
    return {
        list,
        input,
        uLoc
    }
}
export default connect(mapStateToProps, { fetchList, locationChange })(EventList);