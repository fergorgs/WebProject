import React from 'react'
import '../style.css'

class CartItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity,

    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    const delta = value - this.state.quantity
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.props.changeQuantityHandler(
          value,
          this.props.id,
          this.props.price,
          delta
        )
      }
    )
  }

  render() {
    return (
      <div class='cardCart'>
        <img src={this.props.imgSrc} />
        <div class='infos'>
          <button
            type='submit'
            onClick={() =>
              this.props.deleteProductHandler(
                this.props.id,
                this.state.quantity,
                this.props.price
              )
            }
          >
            Remover
          </button>
          <h3>{this.props.name}</h3>
          <br />
          <input
            type='number'
            min='1'
            name='quantity'
            value={this.state.quantity}
            onChange={this.handleChange}
            placeholder={this.state.quantity}
          ></input>
          <p>R$ {Number(this.props.price).toFixed(2)}</p>
        </div>
      </div>
    )
  }
}

export default CartItem
