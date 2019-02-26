import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, FormText,Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from "axios";

import { connect } from 'react-redux';
import { createNewProject, closeProjectModal } from './actions/userActions';

import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = function (values) {
  return Yup.object().shape({
    name: Yup.string()
    .min(2, `Project name has to be at least 2 characters`)
    .required('Project name is required'),
    lastName: Yup.string()
    .min(1, `Last name has to be at least 1 character`)
    .required('Last name is required'),
    organizationName: Yup.string()
    .min(1, `Organization name has to be at least 1 characters`)
    .required('Organization name is required'),
    password: Yup.string()
    .min(6, `Password has to be at least ${6} characters!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([values.password], 'Passwords must match')
    .required('Password confirmation is required'),
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

const initialValues = {
  firstName: "",
  lastName: "",
  organizationName: "",
  password: "",
  confirmPassword: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: ""
}

class ProjectFormModal extends Component {

  constructor(props) {

    const initialState = {
      modal: true,
      name: '',
      description: '',
      tokenName: '',
      tokenSymbol: '',
      industry: '',
      subIndustry: '',
      subIndustryList: '',
      isLoading: false
    };

    super(props);
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIndustryChange = this.handleIndustryChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  reset() {
    this.setState(this.initialState);
  }

  componentDidMount() {
    if(this.props.isClosed=="true"){
      this.setState({
        modal: false
      })
    }
  }

  toggle() {
    this.props.closeProjectModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleIndustryChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    switch(value){
      case "1": console.log("1");
                break;
    }
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.setState({
      isLoading: true
    })
    const {name, description, industry, subIndustry, tokenName, tokenSymbol, isLoading} = this.state;
    // axios.post("/api/dashboard/createProject", {name: name, industry: industry, subIndustry: subIndustry, tokenName: name, tokenSymbol: name, clientToken: sessionStorage.getItem("clientToken")}).then(res=> {
    //   if(res.data.status=="Project created successsfully"){
    //     this.reset();
    //     this.toggle();
    //     this.props.parentHandler(res.data.project.name)
    //   }
    // });
    this.props.createNewProject({name: name, description: description, industry: industry, subIndustry: subIndustry, tokenName: name, tokenSymbol: name, organizationName: this.props.user.organization.organizationName, clientToken: sessionStorage.getItem("clientToken")});
  }

  render() {
    const {name, description, industry, subIndustry, tokenName, tokenSymbol, isLoading} = this.state;
    let button;
    if(!isLoading){
      button = <Button color="primary" onClick = {this.onSubmitForm} >Create Project</Button>;
    }
    else {
      button = <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>;
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Modal isOpen={this.props.user.projectModalOpen} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}><strong>New Project Form</strong></ModalHeader>
              <ModalBody>
              <Form className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Project Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text"
                           name="name"
                           value= {name}
                           onChange={this.handleChange}  id="text-input" placeholder="Text" />
                    <FormText color="muted">This is a help text</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Project Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text"
                           id="text-input"
                          name="description"
                          onChange={this.handleChange}
                          placeholder="Text" />
                    <FormText color="muted">Describe your project</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select Industry</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="industry" value= {industry} onChange={this.handleIndustryChange} id="select">
                      <option value="0">Please select</option>
                      <option value="Smart City">Smart City</option>
                      <option value="Building">Building</option>
                      <option value="Energy">Energy</option>
                      <option value="Automobile">Automobile</option>
                      <option value="Retail">Retail</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Supply Chain">Supply Chain</option>
                      <option value="Industry">Industry</option>
                      <option value="Other">Other</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Sub Industry</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" name="subIndustry" value= {subIndustry} onChange={this.handleChange} id="text-input" placeholder="Text" />
                    <FormText color="muted">This is a help text</FormText>
                  </Col>
                </FormGroup>
              </Form>
              </ModalBody>
              <ModalFooter>
                {button}
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
    user: state.user,
    errors: state.errors
});

export  default connect(mapStateToProps, { createNewProject, closeProjectModal })(ProjectFormModal)
