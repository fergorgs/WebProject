import React from 'react';
import '../style.css'



class ServiceRegisterForm extends React.Component {

    componentWillMount(){

        this.setState({ service: '',
                        date: null,
                        time: null,
                        animalName: '',
                        ownerName: '',
                      })
    }

    serviceHandler = (event) => {
        this.setState({service: event.target.value})
    }
    dateHandler = (event) => {
        this.setState({date: event.target.value})
    }
    timeHandler = (event) => {
        this.setState({time: event.target.value})
    }
    animalNameHandler = (event) => {
        this.setState({animalName: event.target.value})
    }
    ownerNameHandler = (event) => {
        this.setState({ownerName: event.target.value})
    }
    submitHandler = () => {
        //send to server
        alert("Serviço registrado")
    }

    render() {

        return (
            <main>
                <div class="formAgendarHolder">
                    <div class="formAgendar  shadow">
                        <h1>Novo Serviço</h1>
                        <div style={{width: '100%', textAlign: 'left'}}>
                            <select onChange={this.serviceHandler}>
                                <option>Tosa</option>
                                <option>Banho</option>
                                <option>Consulta</option>
                            </select>
                        </div>
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
                        <input 
                            type="text" 
                            placeholder="Nome do animal" 
                            class="nameInput" 
                            onChange={this.animalNameHandler}
                            />
                        <input 
                            type="text" 
                            placeholder="Nome do cliente"
                            class="nameInput"
                            onChange={this.ownerNameHandler} 
                            />
                        
                        
                        <button type="submit" onClick={this.submitHandler}>Confirmar</button>
                    </div>
                </div>    
            </main>
        );
    }
}

export default ServiceRegisterForm;