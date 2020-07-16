import React from 'react';
import '../style.css'
import {
    Link,
    Redirect,
  } from "react-router-dom";


class AdminLoginForm extends React.Component {

    componentWillMount(){
        this.setState({ cpf: '',
                        password: '',
                        logedin: false,
                      })
    }

    cpfHandler = (event) => {
        this.setState({cpf: event.target.value})
    }
    passwordHandler = (event) => {
        this.setState({password: event.target.value})
    }
    submitHandler = () => {
        
        //client authentication

       this.setState({logedin: true})
    }

    render() {
            return (
                <main>
                    <div class="formAgendarHolder">
                        <div class="formAgendar  shadow">
                            <h1>Login Admin </h1>
                            <input 
                                type="text" 
                                placeholder="CPF" 
                                class="nameInput"
                                value={this.state.cpf}
                                onChange={this.cpfHandler}
                            />
                            <input 
                                type="password" 
                                placeholder="Senha" 
                                class="nameInput"
                                value={this.state.password}
                                onChange={this.passwordHandler}
                            />
                            
                            <Link to="/admin">
                                <button type="submit" onClick={this.submitHandler}>Confirmar</button>
                            </Link>

                            
                        </div>
                    </div>

                    <div class="formAgendarHolder">
                        <div class="formAgendar  shadow">
                            <Link to="/login/client">
                                <button type="submit">Logar como Cliente</button>
                            </Link>
                        </div>
                    </div>

                </main>
            );
    }
}

export default AdminLoginForm;