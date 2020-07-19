import React from 'react';
import '../style.css'


class ProductCard extends React.Component {

    componentWillMount(){
        this.setState({quantity: 1})
    }

    changeQuantityHandler = (event) => {
        this.setState({quantity: event.target.value})
    }

    buyHandler = () => {
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