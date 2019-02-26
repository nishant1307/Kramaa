import React, {Component} from 'react';
import {Card, CardHeader, CardBody, NavLink} from 'reactstrap';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';
const defaultZoom = 17;

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return locations.map((location, index) => {
        return (
          <MarkerWithInfoWindow key={index.toString()} location={location}/>
        )
      }
    );
  }
}


class GoogleMapsComponent extends Component{
  constructor(props) {
    super(props);
    this.state={
      latitude: 19.136553,
      longitude: 72.832848,
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    axios.post("/api/events/getLocation", {})
    .then(res=> {
      this.setState({
        latitude: parseFloat(res.data.latitude),
        longitude: parseFloat(res.data.longitude)
      });

    });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
    const {latitude, longitude} =this.state;
    let defaultCenter = {lat: latitude, lng: longitude};
    let location = {
      lat: latitude,
      lng: longitude,
      label: 'X',
      draggable: false,
      title: 'Xinfin',
      www: 'https://www.xinfin.org/'
    };
    console.log(location);
    return (
      <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
        <Marker onClick={this.toggle} position={location} title={location.title} label={location.label}>
          {this.state.isOpen &&
          <InfoWindow onCloseClick={this.toggle}>
            <NavLink href={location.www} target="_blank">{location.title}</NavLink>
          </InfoWindow>}
        </Marker>
      </GoogleMap>
    );
  }
}
export default withScriptjs(withGoogleMap(GoogleMapsComponent));
