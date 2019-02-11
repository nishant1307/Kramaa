import React, {Component, Suspense} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import RegisterDeviceModal from "./RegisterDeviceModal";
import { Col, Button, Card, CardHeader, CardBody, ListGroupItem, ListGroup } from 'reactstrap';

class DevicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceID: '',
      deviceURN: '',
      deviceBlockchainID: '',
      transactionHash: '',
      associationStatus: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  renderDeviceModal(){
    this.deviceModalToggler.current.toggle();
  }

  mintTokenFormHandler(newDeviceCount) {
    this.setState({
      totalSupply: parseInt(this.state.totalSupply)+ parseInt(newDeviceCount)
    })
  }

  componentDidMount() {
    axios.post('/api/devices/getDeviceInfo', {'deviceID': this.props.match.params.deviceID, clientToken: sessionStorage.getItem("clientToken")}).then(res => {
      this.setState({
        deviceID: res.data.device.uniqueId,
        deviceURN: res.data.device.urn,
        deviceBlockchainID: res.data.device.tokenId,
        transactionHash: res.data.device.transactionHash,
        associationStatus: res.data.device.associationStatus,
      })
    })
  }
  render(){
    const {deviceID, deviceURN, deviceBlockchainID, transactionHash, associationStatus} = this.state;
    return(
      <div>
      <Suspense fallback={this.loading()}>
        <Link to="/devices"><Button color="primary">Back to Devices</Button></Link><br /><br/>
        <Col sm="12" xl="6">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Device ID: {deviceID}</strong>
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem>Device URN: {deviceURN}</ListGroupItem>
                <ListGroupItem>Device Blockchain ID: {deviceBlockchainID}</ListGroupItem>
                <ListGroupItem>Transaction Hash: {transactionHash}</ListGroupItem>
                <ListGroupItem>Association Status: {associationStatus}</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Suspense>
      </div>
    )
  }
}
export default DevicePage;
