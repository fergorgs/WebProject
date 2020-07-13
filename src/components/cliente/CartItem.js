import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


class CartItem extends React.Component {

    render() {
        return (
            <div class="cardCart">
                <img src={this.props.imgSrc}/>
                <div class="infos">
                    <h3>{this.props.name}</h3><br/>
                    <p>R$ {(Number(this.props.price)).toFixed(2)}</p>
                </div>
            </div>
        );
    }
}

export default CartItem;