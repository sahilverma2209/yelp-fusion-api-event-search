import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from 'react';

const MyMapComponent = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lon }} />}
  </GoogleMap>
)

export default MyMapComponent;
