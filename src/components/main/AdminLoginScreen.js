import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import AdminLoginForm from './AdminLoginForm'




class AdminLoginScreen extends React.Component {

    render() {

        return (
            <AdminLoginForm history={this.props.history}/>
        );
    }
}

export default AdminLoginScreen;