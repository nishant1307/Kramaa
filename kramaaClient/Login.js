import React, { Component, Suspense } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from './actions/authentication';

import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = function (values) {
  return Yup.object().shape({
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
    password: Yup.string()
    .required('Password is required'),
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
  email: "",
  password: ""
}

//Login Page Component
class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
        forgotPassword: '',
        forgotPasswordEmail: '',
        message: '',
        errors: {}
      };

      this.handleChange = this.handleChange.bind(this);
      this.onSubmitResetForm = this.onSubmitResetForm.bind(this);
      this.forgotPassword = this.forgotPassword.bind(this);
    }

    loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

    handleChange(e) {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      this.setState({ [name]: value });
    }

    onSubmit = (values, {
          props = this.props,
          setSubmitting
    }) => {
        console.log(values);
        //process form submission here
        //done submitting, set submitting to false
        setSubmitting(false);
        return;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onSubmitResetForm(e) {
      e.preventDefault();
      axios.post("/api/users/forgotPassword", {email: this.state.forgotPasswordEmail}).then(res=> {
        if(res.data.status==true){
          this.setState({
            forgotPassword: 'sent'
          });
        }
        else{
          this.setState({
            message: <Alert color="danger">
                            {res.data.message}
                          </Alert>
          });
        }

      });
    }

    forgotPassword(e) {
      this.setState({
        forgotPassword: 'true'
      })
    }

    findFirstError (formName, hasError) {
      const form = document.forms[formName]
      for (let i = 0; i < form.length; i++) {
        if (hasError(form[i].name)) {
          form[i].focus()
          break
        }
      }
    }

    validateForm (errors) {
      this.findFirstError('loginForm', (fieldName) => {
        return Boolean(errors[fieldName])
      })
    }

    touchAll(setTouched, errors) {
      setTouched({
          email: true,
          password: true
        }
      )
      this.validateForm(errors)
    }

    render() {
        const { email, password, forgotPassword, forgotPasswordEmail, message, errors } = this.state;
        let render;
        let errorMessageAlert;
        if(errors.message){
          errorMessageAlert = <Alert color="danger">
                                {errors.message}
                              </Alert>;
        }
        if(forgotPassword=='true'){
          render =
          <CardGroup>
            <Card className="p-4">
              <CardBody>
                <Form name='loginForm'>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="email" placeholder="Email ID" name="forgotPasswordEmail" value= {forgotPasswordEmail} onChange={this.handleChange} autoComplete="email" />
                </InputGroup>
                <Row>
                  <Col xs="6">
                    <Button color="primary" className="px-4" onClick= {this.onSubmitResetForm}>Send Reset Password Link</Button>
                  </Col>
                </Row>
                </Form>
              </CardBody>
            </Card>
          </CardGroup>;
        }
        else if(forgotPassword=='sent'){
          render =
          <CardGroup>
            <Card className="p-4">
              <CardBody>
                  A reset password link has been sent to your email id.
              </CardBody>
            </Card>
          </CardGroup>;
        }
        else{
          render =
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                <Formik
                  initialValues={initialValues}
                  validate={validate(validationSchema)}
                  onSubmit={(values, { setSubmitting }) => {
                      this.props.loginUser(values);
                      setSubmitting(false);
                  }}
                  render={
                    ({
                      values,
                      errors,
                      touched,
                      status,
                      dirty,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      handleReset,
                      setTouched
                    }) => (
                  <Form onSubmit={handleSubmit} name="loginForm">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {errorMessageAlert}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email"
                             placeholder="Email ID"
                             name="email"
                             onChange={handleChange}
                             autoComplete="email"
                             valid={!errors.email}
                             invalid={touched.email && !!errors.email}
                             required
                             onBlur={handleBlur}
                             value={values.email}/>
                        <FormFeedback>{errors.email}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             placeholder="Password"
                             name="password"
                             onChange={handleChange}
                             autoComplete="current-password"
                             valid={!errors.password}
                             invalid={touched.password && !!errors.password}
                             required
                             onBlur={handleBlur}
                             value={values.password} />
                       <FormFeedback>{errors.password}</FormFeedback>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" disabled={isSubmitting || !isValid} onClick= {this.onSubmitForm}>{isSubmitting ? 'Please Wait...' : 'Login'}</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0" onClick= {this.forgotPassword}>Forgot password?</Button>
                      </Col>
                    </Row>
                  </Form>
                  )} />
                  Not yet registered on the platform? <Link to="/register">
                      <Button color="link" className="px-0" >Click Here</Button>
                    </Link>
                </CardBody>
              </Card>
            </CardGroup>;
        }
        return (
          <div className="app flex-row align-items-center">
            <Container>
            <Suspense fallback={this.loading()}>
            </Suspense>
              <Row className="justify-content-center">
                <Col md="8">
                {render}
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)
