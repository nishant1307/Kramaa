import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import axios from "axios";

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../_nav';
// routes config
import routes from '../routes';

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authentication';
class Layout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  componentWillMount(){
    if(sessionStorage.clientToken) {
      const currentTime = Date.now() / 1000;
      const decoded = jwt_decode(sessionStorage.clientToken);
      console.log(decoded);
      if(decoded.exp < currentTime) {
        sessionStorage.removeItem('clientToken');
        setAuthToken(false);
        this.props.logoutUser(this.props.history);
      }
      else {
        setAuthToken(sessionStorage.clientToken);
        this.props.setCurrentUser(decoded);
      }
    }
  }

  signOut(e) {
    e.preventDefault()
    this.props.logoutUser(this.props.history);
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <Header onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <Footer />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { setCurrentUser, logoutUser })(withRouter(Layout));
