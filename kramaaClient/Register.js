import React, { Component } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
const SITEKEY = "6LcSQ5AUAAAAADkqQKiKrkM4_4xScRtChBrSjOwT";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from './actions/authentication';
import PropTypes from 'prop-types';

const validationSchema = function (values) {
  return Yup.object().shape({
    firstName: Yup.string()
    .min(2, `First name has to be at least 2 characters`)
    .required('First name is required'),
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


class Register extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        userStatus: '',
        submittedOTP: '',
        otpVerified: '',
        firstName: '',
        lastName: '',
        password: '',
        repeatPassword: '',
        userRegistered: '',
        organizationName: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        errorMessage: '',
        registerButton: true,
        errors: {}
      };

      this.handleChange = this.handleChange.bind(this);
      this.onSubmitForm = this.onSubmitForm.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSubmitOTP = this.onSubmitOTP.bind(this);
    }

    onChange(recaptchaToken) {
      // Here you will get the final recaptchaToken!!!
      console.log(recaptchaToken, "<= your recaptcha token")
      this.setState({
        registerButton: false
      })
    }

    handleChange(e) {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      this.setState({ [name]: value });
    }
    onSubmitForm(e) {
      e.preventDefault();
      axios.post('/api/users/userOnboarding', {email: this.state.email})
      .then(res => {
        this.setState({userStatus: res.data.status})
      })
    }

    componentDidMount() {
       if(this.props.auth.isAuthenticated) {
           this.props.history.push('/dashboard');
       }
   }

    onSubmitOTP(e) {
      e.preventDefault();
      axios.post('/api/users/verifyOTP', {'email': this.state.email, 'otp': this.state.submittedOTP})
      .then(res => {
        if(res.data.status == "true"){
          this.setState({otpVerified: "true"})
        }
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
      this.findFirstError('simpleForm', (fieldName) => {
        return Boolean(errors[fieldName])
      })
    }

    touchAll(setTouched, errors) {
      setTouched({
          firstName: true,
          lastName: true,
          userName: true,
          email: true,
          password: true,
          confirmPassword: true,
        }
      )
      this.validateForm(errors)
    }

    render() {
        const { errorMessage, email, submittedOTP, otpVerified, firstName, lastName, organizationName, addressLine1, addressLine2, addressLine3, password, repeatPassword, userRegistered, registerButton } = this.state;
        let render;
        if(this.state.userStatus==""){
          render = <div>
            <h2>Register</h2>
            <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="email" value= {email} onChange={this.handleChange} placeholder="Enter email" autoComplete="username" />
            </InputGroup>
            <Button color="success" onClick= {this.onSubmitForm} block>Register</Button>
          </Form>
        </div>;
      }
      else if(this.state.userStatus=="User already exists"){
        render = <div>
          <h3>User Has already been Registered to the Kramaa platform</h3>
            <Link to="/">
              <Button color="primary" className="mt-3" active tabIndex={-1}>Proceed to Login</Button>
            </Link>
          </div>;
      }
      else if(otpVerified==""){
          render = <div>
            <h2>OTP</h2>
            <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="submittedOTP" value= {submittedOTP} onChange={this.handleChange} placeholder="Enter  OTP" autoComplete="username" />
            </InputGroup>
            <Row>
              <Col xs="6">
                <Button color="primary" className="px-4" onClick= {this.onSubmitOTP}>Submit OTP</Button>
              </Col>
              <Col xs="6" className="text-right">
                <Button color="link" className="px-0" onClick= {this.onSubmitForm}>Resend OTP</Button>
              </Col>
            </Row>
          </Form>
        </div>;
        }
        else if(userRegistered==""){
        render =<Formik
          initialValues={initialValues}
          validate={validate(validationSchema)}
          onSubmit={(values, { setSubmitting }) => {
            values.email = this.state.email;
            this.props.registerUser(values, this.props.history);
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
                    <Form onSubmit={handleSubmit} noValidate>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      {errorMessage}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               name="firstName"
                               onChange={this.handleChange}
                               placeholder="First Name"
                               autoComplete="username"
                               valid={!errors.firstName}
                               invalid={touched.firstName && !!errors.firstName}
                               autoFocus={true}
                               required
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.firstName}/>
                        <FormFeedback>{errors.firstName}</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               name="lastName"
                               value= {lastName}
                               onChange={this.handleChange}
                               placeholder="Last Name"
                               autoComplete="username"
                               valid={!errors.lastName}
                               invalid={touched.lastName && !!errors.lastName}
                               required
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.lastName} />
                        <FormFeedback>{errors.lastName}</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-people"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               name="organizationName"
                               placeholder="Organization Name" autoComplete="Organization Name"
                               valid={!errors.organizationName}
                               invalid={touched.organizationName && !!errors.organizationName}
                               required
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.organizationName} />
                        <FormFeedback>{errors.organizationName}</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-notebook"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine1" required value= {values.addressLine1} onChange={handleChange}  onBlur={handleBlur} placeholder="AddressLine1" autoComplete="AddressLine1" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-notebook"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine2" value= {values.addressLine2} onChange={handleChange} onBlur={handleBlur} placeholder="AddressLine2" autoComplete="AddressLine2" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-notebook"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="addressLine3" value= {values.addressLine3} onChange={handleChange} onBlur={handleBlur} placeholder="AddressLine3" autoComplete="AddressLine3" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" readOnly name="email" value= {email} placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                               name="password"
                               value= {password}
                               onChange={handleChange}
                               placeholder="Password"
                               autoComplete="new-password"
                               valid={!errors.password}
                               invalid={touched.password && !!errors.password}
                               required
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.password} />
                        <FormFeedback>{errors.password}</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                               name="confirmPassword"
                               id="confirmPassword"
                               placeholder="Confirm password"
                               autoComplete="new-password"
                               valid={!errors.confirmPassword}
                               invalid={touched.confirmPassword && !!errors.confirmPassword}
                               required
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.confirmPassword} />
                        <FormFeedback>{errors.confirmPassword}</FormFeedback>
                        </InputGroup>
                      <ReCAPTCHA
                        sitekey={SITEKEY}
                        onChange={this.onChange}
                      />
                      <Button color="primary" className="mr-1" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Create account'}</Button>

                    </Form>
            )} />;
        }
        else {
          render = <div>
            <h3>User Has been Registered Successfully</h3>
              <Link to="/">
                <Button color="primary" className="mt-3" active tabIndex={-1}>Proceed to Login</Button>
              </Link>
            </div>;
        }
        return (
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <Card className="mx-4">
                    <CardBody className="p-4">

                      {render}

                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
          </div>

        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
