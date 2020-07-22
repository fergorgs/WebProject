import React from 'react';
import Footer from './main/Footer'
import './style.css'
import {
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
  import AdminHeader from './administrador/AdminHeader'
  import ServicesScreen from './administrador/ServicesScreen'
  import StockScreen from './administrador/StockScreen'
  import RegisterScreen from './administrador/RegisterScreen'
  import SalesScreen from './administrador/SalesScreen'
import { PermissionContext } from './contexts/PermissionContext';


class AdminScreen extends React.Component {

    render() {
        return (
            <div className="wrapper-sticky">
              <div className="header-content">
                <AdminHeader match={this.props.match}/>
                {this.context.permission === 'Admin' ? <Switch>
                  <Route exact path={this.props.match.path}>
                    <Redirect to={`${this.props.match.path}/servicos`}/>
                  </Route>
                  <Route path={`${this.props.match.path}/servicos`} component={ServicesScreen}/>
                  <Route path={`${this.props.match.path}/estoque`} component={StockScreen}/>
                  <Route path={`${this.props.match.path}/registro`} component={RegisterScreen}/>
                  <Route path={`${this.props.match.path}/vendas`} component={SalesScreen}/>
                </Switch> : <Redirect to={'/'} />}
                
              </div>
              <Footer/>
            </div>
        );
    }
}
AdminScreen.contextType = PermissionContext
export default AdminScreen;