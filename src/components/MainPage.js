import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Header from './main/Header'
import Content from './main/Content'
import Footer from './main/Footer'
import AdminLoginScreen from './main/AdminLoginScreen'
import ClientLoginScreen from './main/ClientLoginScreen'
import ClientCreateScreen from './main/ClientCreateScreen'


class MainPage extends React.Component {

  render(){

    return (

      <BrowserRouter>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path={this.props.match.path}>
              <Redirect to={`${this.props.match.path}/client`}/>
            </Route>
            <Route path={`${this.props.match.path}/admin`} component={AdminLoginScreen}/>
            <Route path={`${this.props.match.path}/client`} component={ClientLoginScreen}/>
            <Route path={`${this.props.match.path}/create`} component={ClientCreateScreen}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainPage;