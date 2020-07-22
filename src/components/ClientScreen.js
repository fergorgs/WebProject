import React from 'react';
import Footer from './main/Footer'
import ClientHeader from './cliente/ClientHeader'
import './style.css'
import {
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import ProductsScreen from './cliente/ProductsScreen';
import ProductDetailsScreen from './cliente/ProductDetailsScreen'
import AdoptionScreen from './cliente/AdoptionScreen'
import ProfileScreen from './cliente/ProfileScreen'
import ShopCartScreen from './cliente/ShopCartScreen';
import ShowerBookingScreen from './cliente/ShowerBookingScreen';
import PetDetailsScreen from './cliente/PetDetailsScreen';
import AddPetScreen from './cliente/AddPetScreen';
import { PermissionContext } from './contexts/PermissionContext';


class ClientScreen extends React.Component {

    render() {
        return (
            <div className="wrapper-sticky">
              <div className="header-content">
                <ClientHeader match={this.props.match}/>
                {this.context.permission === 'Client' ? <Switch>
                  <Route exact path={this.props.match.path}>
                    <Redirect to={`${this.props.match.path}/produtos`}/>
                  </Route>
                  <Route path={`${this.props.match.path}/produtos/:id`} component={ProductDetailsScreen} />
                  <Route path={`${this.props.match.path}/produtos`} component={ProductsScreen}/>
                  <Route path={`${this.props.match.path}/adocao/:id`} component={PetDetailsScreen}/>
                  <Route path={`${this.props.match.path}/adocao`} component={AdoptionScreen}/>
                  <Route path={`${this.props.match.path}/perfil/novo_pet`} component={AddPetScreen}/>
                  <Route path={`${this.props.match.path}/perfil`} component={ProfileScreen}/>
                  <Route path={`${this.props.match.path}/carrinho`} component={ShopCartScreen}/>
                  <Route path={`${this.props.match.path}/agendamentos`} component={ShowerBookingScreen}/>
                </Switch> : 
                <Redirect to={'/'} />}
                
              </div>
              <Footer/>
            </div>
        );
    }
}
ClientScreen.contextType = PermissionContext
export default ClientScreen;