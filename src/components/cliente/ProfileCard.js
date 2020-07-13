import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


class ProfileCard extends React.Component {

    componentWillMount(){
        this.setState({editMode: false,
                       name: this.props.name,
                       id: this.props.id,
                       address: this.props.address,
                       phone: this.props.phone,
                       email: this.props.email,
                       cpf: this.props.cpf
                    })
    }

    editModeHandler = () => {
        this.setState({editMode: !this.state.editMode})
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value})
    }
    changeIDHandler = (event) => {
        this.setState({id: event.target.value})
    }
    changeAddressHandler = (event) => {
        this.setState({address: event.target.value})
    }
    changePhoneHandler = (event) => {
        this.setState({phone: event.target.value})
    }
    changeEmailHandler = (event) => {
        this.setState({email: event.target.value})
    }
    changeCPFHandler = (event) => {
        this.setState({cpf: event.target.value})
    }

    render() {

        if(this.state.editMode){
            return (
                <div class="perfilInfoBox">
                    <img src={require("../images/mode_edit.png")} class="edit" onClick={this.editModeHandler}/>
                    <h3>Dados do cliente</h3>
                    <div id="photoAndName">
                        <img class="image" src={this.props.imgSrc}/>
                        <input 
                            type="text" 
                            value={this.state.name} 
                            onChange={this.changeNameHandler}
                            style={{height: '2em', marginLeft: '1em', marginTop: '2em'}}
                        />
                    </div>
                    <div id="perfilInfo">
                        <div id="perfilInfoLabels">
                            <p>ID</p>
                            <p>Endereço</p>
                            <p>Telefone</p>
                            <p>Email</p>
                            <p>CPF</p>
                        </div>
                        <div id="perfilInfoContent">
                            
                            <input 
                                type="text" 
                                value={this.state.id} 
                                onChange={this.changeIDHandler}
                                style={{height: '2em', marginLeft: '0.5em', marginTop: '1em'}}
                            />
                            <input 
                                type="text" 
                                value={this.state.address} 
                                onChange={this.changeAddressHandler}
                                style={{height: '2em', marginLeft: '0.5em', marginTop: '1em'}}
                            />
                            <input 
                                type="text" 
                                value={this.state.phone} 
                                onChange={this.changePhoneHandler}
                                style={{height: '2em', marginLeft: '0.5em', marginTop: '1em'}}
                            />
                            <input 
                                type="text" 
                                value={this.state.email} 
                                onChange={this.changeEmailHandler}
                                style={{height: '2em', marginLeft: '0.5em', marginTop: '1em'}}
                            />
                            <input 
                                type="text" 
                                value={this.state.cpf} 
                                onChange={this.changeCPFHandler}
                                style={{height: '2em', marginLeft: '0.5em', marginTop: '1em'}}
                            />
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div class="perfilInfoBox">
                <img src={require("../images/mode_edit.png")} class="edit" onClick={this.editModeHandler}/>
                <h3>Dados do cliente</h3>
                <div id="photoAndName">
                    <img class="image" src={this.props.imgSrc}/>
                    <p>{this.state.name}</p>
                </div>
                <div id="perfilInfo">
                    <div id="perfilInfoLabels">
                        <p>ID</p>
                        <p>Endereço</p>
                        <p>Telefone</p>
                        <p>Email</p>
                        <p>CPF</p>
                    </div>
                    <div id="perfilInfoContent">
                        <p id="ID">{this.state.id}</p>
                        <p id="endereco">{this.state.address}</p>
                        <p id="telefone">{this.state.phone}</p>
                        <p id="email">{this.state.email}</p>
                        <p id="cpf">{this.state.cpf}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileCard;