import React, {Component, Suspense} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ProjectFormModal from './ProjectFormModal';
import RegisterDeviceModal from './RegisterDeviceModal';
import RegisterThingModal from './RegisterThingModal';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { openProjectModal } from './actions/userActions';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      projectList: [],
      organization: '',
      deviceCount: '',
      projectCount: '',
      thingCount: '',
      loading: false,
    };

    this.projectFormHandler = this.projectFormHandler.bind(this);
    this.mintTokenFormHandler = this.mintTokenFormHandler.bind(this);
    this.thingFormHandler = this.thingFormHandler.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToProject = this.goToProject.bind(this);
    // this.projectModalToggler = React.createRef();
    this.deviceModalToggler = React.createRef();
    this.thingModalToggler = React.createRef();
    this.renderProjectModal = this.renderProjectModal.bind(this);
    this.renderDeviceModal = this.renderDeviceModal.bind(this);
    this.renderThingModal = this.renderThingModal.bind(this);
    this.logout = this.logout.bind(this);
  }
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  componentWillMount() {
    axios.post("/api/dashboard/projectList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      if(res.data.status==false){
        this.props.history.push('/');
      }
      else{
        for(let i=0; i<res.data.projects.length; i++){
          this.setState({
            projectList: [...this.state.projectList, res.data.projects[i].name],
          })
        }
      }
    });
  }

  renderProjectModal(){
    // this.projectModalToggler.current.toggle();
    this.props.openProjectModal();
  }

  renderDeviceModal(){
    this.deviceModalToggler.current.toggle();
  }

  renderThingModal(){
    this.thingModalToggler.current.toggle();
  }

  projectFormHandler(projectName) {
    this.setState({
      projectList: [...this.state.projectList, projectName],
      projectCount: parseInt(this.state.projectCount)+1
    })
  }

  mintTokenFormHandler(newDeviceCount) {
    this.setState({
      deviceCount: parseInt(this.state.deviceCount)+ parseInt(newDeviceCount)
    })
  }

  thingFormHandler(thingName, thingDescription, thingAttributes, thingBrand) {
    this.renderThingModal();
    axios.post("/api/dashboard/createThing", {thingName: thingName, thingDescription: thingDescription, thingAttributes: thingAttributes, thingBrand: thingBrand, clientToken: sessionStorage.getItem("clientToken")}).then(res=> {
      if(res.data.status==true){
        this.setState({
          thingCount: parseInt(this.state.thingCount)+1
        })
      }
    });
  }

  goToProject(uniqueId) {
    this.props.history.push('/project/'+uniqueId);
  }

  goToLogin() {
    this.props.history.push('/login');
  }

  logout() {
    sessionStorage.clear();
    this.props.history.push('/');
  }

  render(){
    const { email, projectList, organization, projectCount, deviceCount, thingCount, loading} = this.state;
    let dashboardRender;
    if(this.props.user.organization==null){
      dashboardRender=  <Col>
            <div className="sk-double-bounce">
              <div className="sk-child sk-double-bounce1"></div>
              <div className="sk-child sk-double-bounce2"></div>
            </div>
      </Col>
    }
    else {
      dashboardRender= <div>
      <h2>Welcome to Kramaa Dashboard</h2> <br/>
      <Suspense fallback={this.loading()}><h5>Organization: {this.props.user.organization.organizationName} </h5> <br/></Suspense>
      <Suspense fallback={this.loading()}><h5>Organization ID: {this.props.user.organization.uniqueId} </h5> <br/></Suspense >
      <Row>
        <Col xs="12" sm="6" md="4">
          <Card>
            <CardHeader className="text-center">
              Project Count
            </CardHeader>
            <Suspense fallback={this.loading()}>
              <CardBody className="text-center">
                {this.props.user.projectCount}
              </CardBody>
            </Suspense>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="4">
          <Card>
            <CardHeader className="text-center">
              Device Count
            </CardHeader>
            <Suspense fallback={this.loading()}>
              <CardBody className="text-center">
                {this.props.user.deviceCount}
              </CardBody>
            </Suspense>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="4">
          <Card>
            <CardHeader className="text-center">
              Thing Count
            </CardHeader>
            <Suspense fallback={this.loading()}>
              <CardBody className="text-center">
                {this.props.user.thingsCount}
              </CardBody>
            </Suspense>
          </Card>
        </Col>
      </Row>
      </div>;
    }
    return(

      <div>
        {dashboardRender}
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-primary text-center">
              <CardBody onClick= {this.renderProjectModal}>
                <blockquote className="card-bodyquote">
                  <p>Create new project</p>
                  <footer><i className="fa fa-plus-circle font-2xl d-block mt-4"></i></footer>
                </blockquote>
              </CardBody>
            </Card>
            <ProjectFormModal isClosed= "true"/>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-primary text-center">
              <CardBody onClick= {this.renderDeviceModal}>
                <blockquote className="card-bodyquote">
                  <p>Add new device</p>
                  <footer><i className="fa fa-plus-circle font-2xl d-block mt-4"></i></footer>
                </blockquote>
              </CardBody>
            </Card>
            <RegisterDeviceModal ref= {this.deviceModalToggler} parentHandler= {this.mintTokenFormHandler} projectList={projectList}/>
          </Col>
          <Col xs="12" sm="6" md="4">
          <Card className="text-white bg-primary text-center">
            <CardBody onClick= {this.renderThingModal}>
              <blockquote className="card-bodyquote">
                <p>Add new thing</p>
                <footer><i className="fa fa-plus-circle font-2xl d-block mt-4"></i></footer>
              </blockquote>
            </CardBody>
          </Card>
              <RegisterThingModal ref= {this.thingModalToggler} parentHandler= {this.thingFormHandler}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    user: state.user
})

export default connect(mapStateToProps, {openProjectModal})(Dashboard)
