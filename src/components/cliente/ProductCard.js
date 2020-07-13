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


class ProductCard extends React.Component {

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

        return (
            <div id="productCardHolder">
                <div id="productCard">
                    <div style={{display: 'flex'}}>
                        <img src={this.props.imgSrc} id="productImage"/>
                        <div style={{display: 'unset'}}>
                            <h2>{this.props.name}</h2>
                            <p class="productDescription">{this.props.description}</p>
                            <h3>Preço: R${this.props.price}</h3>
                            <div style={{display: "flex", alignItems: "center" }}>
                                <p>Quantidade:</p>
                                <input 
                                    type="number" 
                                    value={this.state.quantity} 
                                    onChange={this.changeQuantityHandler}
                                />
                                {/* <input type="number" placeholder="1"/> */}
                                <button onClick={this.buyHandler}> Comprar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCard;