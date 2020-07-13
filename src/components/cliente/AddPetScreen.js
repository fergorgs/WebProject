import React from 'react';
import '../style.css'


class AddPetScreen extends React.Component {

    componentWillMount(){
        this.setState({
                        petName: '',
                        petSex: '',
                        petRace: '',
                        petAge: '',
                        petImage: null,
                    })
    }

    nameHandler = (event) => {
        this.setState({petName: event.target.value})
    }
    sexHandler = (event) => {
        this.setState({petSex: event.target.value})
    }
    raceHandler = (event) => {
        this.setState({petRace: event.target.value})
    }
    ageHandler = (event) => {
        this.setState({petAge: event.target.value})
    }
    imageHandler = (event) => {
        this.setState({petImage: event.target.value})
    }

    submitHandler = () => {
        //send to server
        alert('Pet adicionado')
    }

    
    render() {

        return (
            <main>
                <div class="formAgendarHolder">
                    <div class="formAgendar  shadow">
                        <h1>Novo Pet </h1>
                        <input 
                            type="text" 
                            placeholder="Nome do do Pet" 
                            class="nameInput"
                            value={this.state.petName}
                            onChange={this.nameHandler}
                        />
                        <input 
                            type="text" 
                            placeholder="Sex" 
                            class="nameInput"
                            value={this.state.petSex}
                            onChange={this.sexHandler}
                        />
                        <input 
                            type="text" 
                            placeholder="Raça" 
                            class="nameInput"
                            value={this.state.petRace}
                            onChange={this.raceHandler}
                        />
                        <input 
                            type="text" 
                            placeholder="Idade" 
                            class="nameInput"
                            value={this.state.petAge}
                            onChange={this.ageHandler}
                        />
                        <input 
                            type="file" 
                            class="fileInput"
                            onChange={this.imageHandler}    
                        />
                        
                        <button type="submit" onClick={this.submitHandler}>Confirmar</button>
                    </div>
                </div>    
            </main>
        );
    }
}

export default AddPetScreen;