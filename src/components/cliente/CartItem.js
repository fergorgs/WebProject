import React from 'react';
import '../style.css'


class CartItem extends React.Component {

    render() {
        return (
            <div class="cardCart">
                <img src={this.props.imgSrc}/>
                <div class="infos">
                    <button
                      type='submit'
                      onClick={() => this.props.deleteProductHandler(this.props.id, this.props.quantity, this.props.price)}
                    >
                      Remover
                    </button>
                    <h3>{this.props.name}</h3><br/>
                    <input 
                        type="number"
                        onChange={(event) => this.props.changeQuantityHandler(event.target.value, this.props.id)}
                        placeholder={this.props.quantity}
                    >
                    </input>
                    <p>R$ {(Number(this.props.price)).toFixed(2)}</p>
                </div>
            </div>
        );
    }
}

export default CartItem;