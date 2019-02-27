import React, {Component} from 'react';
import {Card, CardHeader, CardBody, NavLink} from 'reactstrap';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';
const defaultZoom = 17;
import GoogleMapsComponent from './GoogleMapsComponent';

class LocationAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app

  render() {
    return (
    <div className="animated fadeIn">
      <Card>
        <CardBody>
          <GoogleMapsComponent
            key="map"
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBLb2_jv4cWTCFwWS7oXQ7ura32iJzvT54"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `400px`}}/>}
            mapElement={<div style={{height: `100%`}}/>}
          />
        </CardBody>
      </Card>
    </div>
    )
  }
}

export default LocationAnalytics;
