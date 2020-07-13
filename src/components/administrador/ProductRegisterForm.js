import React from 'react';
import '../style.css'



class ProductRegisterForm extends React.Component {

    componentWillMount(){
        this.setState({ name: '',
                        id: '',
                        description: '',
                        price: null,
                        quantity: null,
                        photo: null,
                        type: null,
                      })
    }

    nameHandler = (event) => {
        this.setState({name: event.target.value})
    }
    idHandler = (event) => {
        this.setState({id: event.target.value})
    }
    descriptionHandler = (event) => {
        this.setState({description: event.target.value})
    }
    priceHandler = (event) => {
        this.setState({price: event.target.value})
    }
    quantityHandler = (event) => {
        this.setState({quantity: event.target.value})
    }
    photoHandler = (event) => {
        this.setState({photo: event.target.value})
    }
    typeHandler = (event) => {
        //type 1 = racaoGato
        //type 2 = racaoCao 
        //type 3 = areiaGato
        //type 4 = petiscos
        if(event.target.value == 'Ração Gato')
            this.setState({type: 1})
        if(event.target.value == 'Ração Cão')
            this.setState({type: 2})
        if(event.target.value == 'Areia Gato')
            this.setState({type: 3})
        if(event.target.value == 'Petiscos')
            this.setState({type: 4})
    }
    submitHandler = () => {
        //send to server
        alert("Produto registrado")
    }

    render() {

        return (
            <main>
                <div class="formAgendarHolder">
                    <div class="formAgendar  shadow">
                        <h1>Novo Produto </h1>
                        <input 
                            type="text" 
                            placeholder="Nome do produto" 
                            class="nameInput"
                            value={this.state.name}
                            onChange={this.nameHandler}
                        />
                        <input 
                            type="text" 
                            placeholder="ID" 
                            class="nameInput"
                            value={this.state.id}
                            onChange={this.idHandler}
                        />
                        <input 
                            type="text" 
                            placeholder="Descrição" 
                            class="nameInput"
                            value={this.state.description}
                            onChange={this.descriptionHandler}
                        />
                        <input 
                            type="number" 
                            placeholder="Preço" 
                            class="nameInput"
                            value={this.state.price}
                            onChange={this.priceHandler}
                        />
                        <input 
                            type="number" 
                            placeholder="Quantidade" 
                            class="nameInput"
                            value={this.state.quantity}
                            onChange={this.quantityHandler}
                        />
                        <div style={{display: 'flex'}}>
                            <select onChange={this.typeHandler}>
                                <option>Tipo</option>
                                <option>Ração Gato</option>
                                <option>Ração Cão</option>
                                <option>Areia Gato</option>
                                <option>Petiscos</option>
                            </select>
                        </div>
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

export default ProductRegisterForm;