import React from 'react';
import '../style.css'
import {
    Switch,
    Route,
  } from "react-router-dom";
  import ClientRegisterForm from './ClientRegisterForm'
  import AdminRegisterForm from './AdminRegisterForm'
  import ProductRegisterForm from './ProductRegisterForm'
  import ServiceRegisterForm from './ServiceRegisterForm'
import RegisterAnimal from './RegisterAnimal';




class RegisterScreen extends React.Component {

    render() {

        return (
            <Switch>
                  <Route path={`${this.props.match.path}/clientes`} component={ClientRegisterForm}/>
                  <Route path={`${this.props.match.path}/admins`} component={AdminRegisterForm}/>
                  <Route path={`${this.props.match.path}/produtos`} component={ProductRegisterForm}/>
                  <Route path={`${this.props.match.path}/servicos`} component={ServiceRegisterForm}/>
                  <Route path={`${this.props.match.path}/animais`} component={RegisterAnimal}/>
                  
            </Switch>
        );
    }
}

export default RegisterScreen;