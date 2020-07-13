import React from 'react';
import '../style.css'
import Carousel from './Carousel';
import range from 'lodash/range';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import ProductItem from './ProductItem'
import ProductSlider from './ProductSlider';
import placeHolder from './images/golden.jpg'
import placeHolder2 from './images/racaogato.jpeg'
import ServiceRegisterForm from '../administrador/ServiceRegisterForm';
import ProducSlider from './ProductSlider';


class PetDetailsCard extends React.Component {

    componentWillMount(){
        this.setState({quantity: 1})
    }

    changeQuantityHandler = (event) => {
        this.setState({quantity: event.target.value})
    }

    buyHandler = (event) => {
        alert("Item adicionado ao carrinho!")
    }


    render() {

        if(this.props.type == 'adopt'){

            return (
                <div id="productCardHolder">
                    <div id="productCard">
                        <div style={{display: 'flex'}}>
                            <img src={this.props.imgSrc} id="productImage"/>
                            <div style={{display: 'unset', marginLeft: '2em'}}>
                                <h2>{this.props.race}</h2>
                                <p class="productDescription">Idade: {this.props.age}</p>
                                <p class="productDescription">Sexo: {this.props.sex}</p>
                                <h3>Animal para adoção</h3>
                                <button onClick={this.buyHandler} style={{marginLeft: '0', marginTop: '1em'}}>
                                    Adotar 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div id="productCardHolder">
                <div id="productCard">
                    <div style={{display: 'flex'}}>
                        <img src={this.props.imgSrc} id="productImage"/>
                        <div style={{display: 'unset', marginLeft: '2em'}}>
                            <h2>{this.props.species}</h2>
                            <p class="productDescription">Idade: {this.props.age}</p>
                            <p class="productDescription">Sexo: {this.props.sex}</p>
                            <h3>Preço: R${this.props.price}</h3>
                            <button onClick={this.buyHandler} style={{marginLeft: '0', marginTop: '1em'}}>
                                Comprar 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PetDetailsCard;