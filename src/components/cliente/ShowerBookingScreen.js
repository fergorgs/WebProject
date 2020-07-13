import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";



class ShowerBookingScreen extends React.Component {

    componentWillMount(){

        this.setState({
                        nameAndSurname: '',
                        animalName: '',
                        date: '',
                        hour: '',
                        service: '',
                        cost: '0,00',
                    })
    }

    nameAndSurnameHandler = (event) => {
        this.setState({nameAndSurname: event.target.value})
    }
    animalNameHandler = (event) => {
        this.setState({animalName: event.target.value})
    }
    dateHandler = (event) => {
        this.setState({date: event.target.value})
    }
    timeHandler = (event) => {
        this.setState({date: event.target.value})
    }
    serviceHandler = (event) => {
        
        let val = event.target.value
        
        if(val == 'Serviço')
            this.setState({cost: '0,00'})
        else if(val == 'Só banho')
            this.setState({cost: '20,00'})
        else if(val == 'Só tosa')
            this.setState({cost: '35,00'})
        else if(val == 'Banho e tosa')
            this.setState({cost: '55,00'})
    }
    agendarHandler = (event) => {
        alert('Serviço agendado')
    }

    render() {

        return (
            <main>
                <div class="formAgendarHolder">
                    <div class="formAgendar">
                        <h1>Banho/Tosa</h1>
                        <input 
                            type="text" 
                            placeholder="Nome e sobrenome" 
                            class="nameInput"
                            value={this.state.nameAndSurname}
                            onChange={this.nameAndSurnameHandler}
                        />
                        <input 
                            type="text" 
                            placeholder="Nome do animal"
                            class="nameInput"
                            value={this.state.animalName}
                            onChange={this.animalNameHandler}
                        />
                        <div style={{width: '100%', textAlign: 'left'}}>
                            <input 
                                type="date" 
                                class="timeInput"
                                onChange={this.dateHandler}
                            />
                            <input 
                                type="time" 
                                class="timeInput"
                                onChange={this.timeHandler}
                            />
                        </div>
                        <div style={{width: '100%', textAlign: 'left'}}>
                            <select onChange={this.serviceHandler}>
                                <option>Serviço</option>
                                <option>Só banho</option>
                                <option>Só tosa</option>
                                <option>Banho e tosa</option>
                            </select>
                        </div><br/>
                        <h3>Custo: R$ {this.state.cost}</h3>
                        <button type="submit">Agendar</button>
                    </div>
                </div>
            </main>
        );
    }
}

export default ShowerBookingScreen;