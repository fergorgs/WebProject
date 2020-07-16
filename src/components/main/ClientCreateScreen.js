import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import ClientRegisterForm from '../administrador/ClientRegisterForm'





class ClientCreateScreen extends React.Component {

    render() {

        return (
            <div>
                <ClientRegisterForm/>
                <div class="formAgendarHolder">
                        <div class="formAgendar  shadow">
                            <Link to="/login/client">
                                <button type="submit">Voltar para a tela de login</button>
                            </Link>
                        </div>
                    </div>
            </div>
        );
    }
}

export default ClientCreateScreen;