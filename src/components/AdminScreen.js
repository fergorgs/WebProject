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


class AdminScreen extends React.Component {

    render() {
        return (
            <div>
                <AdminHeader match={this.props.match}/>
                
                <Switch>
                  <Route exact path={this.props.match.path}>
                    <Redirect to={`${this.props.match.path}/servicos`}/>
                  </Route>
                  <Route path={`${this.props.match.path}/servicos`} component={ServicesScreen}/>
                  <Route path={`${this.props.match.path}/estoque`} component={StockScreen}/>
                  <Route path={`${this.props.match.path}/registro`} component={RegisterScreen}/>
                  <Route path={`${this.props.match.path}/vendas`} component={SalesScreen}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default AdminScreen;