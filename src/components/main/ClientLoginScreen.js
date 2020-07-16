import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import ClientLoginForm from './ClientLoginForm'




class ClientLoginScreen extends React.Component {

    render() {

        return (
            <ClientLoginForm/>
        );
    }
}

export default ClientLoginScreen;