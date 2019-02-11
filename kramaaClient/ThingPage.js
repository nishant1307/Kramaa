import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import { Row, Col, Button, Card, CardHeader, CardBody, ListGroupItem, ListGroup, Input } from 'reactstrap';

class ThingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      id: '',
      brand: '',
      associationStatus: '',
      uri: [],
      deviceList: [],
      selectedDevice: '',
      assignButton: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.assignDevice = this.assignDevice.bind(this);
    this.fetchDeviceList = this.fetchDeviceList.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    this.setState({ [name]: value });
    if(name=="selectedDevice"){
      this.setState({
        assignButton: <Button color="primary" onClick={this.assignDevice}>Assign to this device </Button>
      })
    }

  }

  assignDevice(){
    axios.post('/api/things/assignDevice', {'thingID': this.props.match.params.thingID, 'deviceID': this.state.selectedDevice, clientToken: sessionStorage.getItem("clientToken")})
    .then(res => {
      console.log("Assigned successfully");
    })
  }

  componentDidMount() {
    axios.post('/api/things/getThingInfo', {'thingID': this.props.match.params.thingID, clientToken: sessionStorage.getItem("clientToken")}).then(res => {
      this.setState({
        name: res.data.thing.name,
        description: res.data.thing.description,
        id: res.data.thing.uniqueId,
        brand: res.data.thing.brand,
        associationStatus: res.data.thing.associationStatus
      })
      for(let i=0; i<res.data.thing.uri.length; i++){
        this.setState({
          uri: [...this.state.uri, res.data.thing.uri[i]]
        })
      }
    })
  }

  fetchDeviceList(){
    axios.post("/api/devices/deviceList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({
        deviceList: res.data.deviceList
      })
      this.forceUpdate();
    });
  }
  render(){
    const {name, description, id, brand, associationStatus, uri, deviceList, selectedDevice, assignButton} = this.state;
    let imageRender = [];
    for(let i=0; i<uri.length; i++){
      imageRender.push(<ListGroupItem>Image {i+1}: <img width="300" height="300" src={"https://gateway.ipfs.io/ipfs/"+uri[i]} /></ListGroupItem>);
    }

    let dropdownRender;

    if(deviceList.length>0){
      dropdownRender = [<option key= "" name= "" value="">Select Device URN</option>];
      let j, k;
      for(var i=0;i<deviceList.length; i++){
        j= deviceList[i].uniqueId;
        k= deviceList[i].urn
        dropdownRender.push(<option key= {j} name= {j} value={j}>{k}</option>);
      }
    }
    return(
      <div>
        <Link to="/things"><Button color="primary">Back to Thing List</Button></Link><br /><br/>
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Thing Name: {name}</strong>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem>Thing ID: {id}</ListGroupItem>
                  <ListGroupItem>Description: {description}</ListGroupItem>
                  <ListGroupItem>Brand: {brand}</ListGroupItem>
                  {imageRender}
                  <ListGroupItem>Association to any device?: {String(associationStatus)}</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6">
            <Button color="primary" onClick={this.fetchDeviceList}>Fetch Device List to associate </Button>
            <Input type="select" name= "selectedDevice" value= {selectedDevice} onChange={this.handleChange} id="select">
              {dropdownRender}
            </Input>
            {assignButton}
          </Col>
        </Row>
      </div>
    )
  }
}
export default ThingPage;
