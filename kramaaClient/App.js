import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import './App.scss';
import Invitation from "./Invitation";
import Layout from "./containers/Layout";
import '@coreui/icons/css/coreui-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css'

import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Route, Link} from "react-router-dom";

class App extends Component{
  render(){
    return(
      <Provider store = { store }>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div>
              <Route exact path="/dashboard" component={Layout}/>
              <Route path="/newProject" component={Layout}/>
              <Route path="/userDatabase" component={Layout}/>
              <Route exact path="/profile" component={Layout}/>
              <Route exact path="/settings" component={Layout}/>
              <Route exact path="/projects" component={Layout}/>
              <Route exact path="/devices" component={Layout}/>
              <Route exact path="/things" component={Layout}/>
              <Route exact path="/thing/:thingID" component={Layout}/>
              <Route exact path="/project/:projectID" component={Layout}/>
              <Route exact path="/device/:deviceID" component={Layout}/>
              <Route exact path="/invitation" component={Invitation}/>
              <Route exact path="/" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/resetPassword" component={ForgotPassword}/>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default hot(module)(App);
