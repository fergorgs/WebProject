import React from 'react';
import '../style.css'


class ClientRegisterForm extends React.Component {

    componentWillMount(){
        this.setState({ name: '',
                        cpf: '',
                        address: '',
                        email: '',
                        phone: '',
                        photo: null,
                      })
    }

    nameHandler = (event) => {
        this.setState({name: event.target.value})
    }
    cpfHandler = (event) => {
        this.setState({cpf: event.target.value})
    }
    addressHandler = (event) => {
        this.setState({address: event.target.value})
    }
    emailHandler = (event) => {
        this.setState({email: event.target.value})
    }
    phoneHandler = (event) => {
        this.setState({phone: event.target.value})
    }
    photoHandler = (event) => {
        this.setState({photo: event.target.value})
    }
    submitHandler = () => {
        //send to server
        alert("Cliente registrado")
    }

    render() {

        return (
            <main>
                <div class="formAgendarHolder">
                    <div class="formAgendar  shadow">
                        <h1>Novo Cliente </h1>
                        <input 
                            type="text" 
                            placeholder="Nome do cliente" 
                            class="nameInput"
                            value={this.state.name}
                            onChange={this.nameHandler}
                        />
                        <input 
                            type="text" 
                            placeholder="CPF" 
                            class="nameInput"
                            value={this.state.cpf}
                            onChange={this.cpfHandler}
                        />
                        <input 
                            type="text" 
                            placeholder="Endereço" 
                            class="nameInput"
                            value={this.state.address}
                            onChange={this.addressHandler}
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            class="nameInput"
                            value={this.state.email}
                            onChange={this.emailHandler}
                        />
                        <input 
                            type="tel" 
                            placeholder="Telefone" 
                            class="nameInput"
                            value={this.state.phone}
                            onChange={this.phoneHandler}
                        />
                        <input 
                            type="file" 
                            class="fileInput"
                            value={this.state.photo}
                            onChange={this.photoHandler}
                        />
                        
                        <button type="submit" onClick={this.submitHandler}>Confirmar</button>
                    </div>
                </div>    
            </main>
        );
    }
}

export default ClientRegisterForm;