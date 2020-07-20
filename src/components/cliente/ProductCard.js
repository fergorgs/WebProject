import React from 'react'
import '../style.css'
import { Redirect } from 'react-router-dom'

class ProductCard extends React.Component {
  componentWillMount() {
    this.setState({ quantity: 1, redirect:`/client/produtos/${this.props.id}` })
  }

  changeQuantityHandler = (event) => {
    this.setState({ quantity: event.target.value })
  }

  buyHandler = () => {
    const data = {
      productId: this.props.id,
      quantity: this.state.quantity,
      clientId: JSON.parse(sessionStorage.getItem('client')).client._id,
    }
    fetch('/cart/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(res=>{
        if(res.ok){
            alert('Item adicionado ao carrinho!')
            this.setState({redirect:'/client/carrinho'})
        }
    })
  }

  render() {
    return (
      <div id='productCardHolder'>
          <Redirect to={this.state.redirect} />
        <div id='productCard'>
          <div style={{ display: 'flex' }}>
            <img alt={this.props.name} src={this.props.imgSrc} id='productImage' />
            <div style={{ display: 'unset' }}>
              <h2>{this.props.name}</h2>
              <p class='productDescription'>{this.props.description}</p>
              <h3>Preço: R${this.props.price}</h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Quantidade:</p>
                <input
                  type='number'
                  min='1'
                  value={this.state.quantity}
                  onChange={this.changeQuantityHandler}
                />
                {/* <input type="number" placeholder="1"/> */}
                <button onClick={this.buyHandler}>
                  {' '}
                  Adicionar ao Carrinho{' '}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCard
