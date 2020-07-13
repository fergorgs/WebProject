import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import ClientRegisterForm from './ClientRegisterForm'
  import AdminRegisterForm from './AdminRegisterForm'
  import ProductRegisterForm from './ProductRegisterForm'
  import ServiceRegisterForm from './ServiceRegisterForm'




class RegisterScreen extends React.Component {

    render() {

        return (
            <Switch>
                  <Route path={`${this.props.match.path}/clientes`} component={ClientRegisterForm}/>
                  <Route path={`${this.props.match.path}/admins`} component={AdminRegisterForm}/>
                  <Route path={`${this.props.match.path}/produtos`} component={ProductRegisterForm}/>
                  <Route path={`${this.props.match.path}/servicos`} component={ServiceRegisterForm}/>
                  {/*<Route path={`${this.props.match.path}/carrinho`} component={ShopCartScreen}/>
                  <Route path={`${this.props.match.path}/banho`} component={ShowerBookingScreen}/>
                  <Route path={`${this.props.match.path}/consulta`} component={AppointmentBookingScreen}/> */}
            </Switch>
        );
    }
}

export default RegisterScreen;