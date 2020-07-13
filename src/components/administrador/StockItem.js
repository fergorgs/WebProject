import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


class StockItem extends React.Component {

    componentWillMount(){
        this.setState({quantity: this.props.quantity})
    }

    changeProductHandler = (event) => {
        
        this.setState({quantity: event.target.value})
        this.props.changeProductHandler(this.props.id, event.target.value)
    }

    render() {
        if(this.props.editMode){
            return (
                <div class="displayCard">
                    <button 
                        type="submit" 
                        onClick={() => this.props.deleteProductHandler(this.props.id)}
                    >
                        Remover
                    </button>
                    <img src={this.props.imgSrc}/>
                    <div class="item">
                        <p class="itemLabel">{this.props.name}</p>
                        <p>Quantidade: 
                            <input 
                                type="number" 
                                value={this.state.quantity}
                                onChange={this.changeProductHandler}
                            >
                            </input>
                            </p>
                    </div>
                </div>
            );
        }

        return (
            <div class="displayCard">
                <img src={this.props.imgSrc}/>
                <div class="item">
                    <p class="itemLabel">{this.props.name}</p>
                    <p>Quantidade: {this.state.quantity} uni.</p>
                </div>
            </div>
        );
    }
}

export default StockItem;