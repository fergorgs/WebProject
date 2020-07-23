import React from 'react'
import '../style.css'
import ShopCartPanel from './ShopCartPanel'
import CartItem from './CartItem'
import ReactInputMask from 'react-input-mask'
import creditCardType from 'credit-card-type'
import { Redirect } from 'react-router-dom'

class ShopCartScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPrice: 0,
      itemsData: [],
      cartId: '',
      name: '',
      number: '',
      expiry: '',
      cvc: '',
      redirect:'/client/carrinho'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  fetchItemsFromServer() {
    //fetch fetch fetch
    fetch('/cart/get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: JSON.parse(sessionStorage.getItem('client')).client._id,
      }),
    }).then(async (res) => {
      if (res.ok) {
        let cart = await res.json()
        cart = cart.cart
        this.setState({ totalPrice: cart.totalPrice, cartId: cart.cartId })
        const items = cart.products.map((prod) => {
          return {
            id: prod.id,
            imgSrc: prod.photo,
            name: prod.name,
            price: prod.price,
            quantity: prod.quantity,
          }
        })
        this.setState({ itemsData: items })
      }
    })
  }

  componentDidMount() {
    this.fetchItemsFromServer()
  }

  changeQuantityHandler = (value, id, price, delta) => {
    fetch('/cart/updateQtd', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prodId: id,
        cartId: this.state.cartId,
        quantity: value,
        delta: delta,
        price: price,
      }),
    }).then(async (res) => {
      if (res.ok) {
        const total = await res.json()
        this.setState({ totalPrice: total.totalPrice })
      }
    })
  }

  deleteProductHandler = (id, quantity, price) => {
    fetch('/cart/removeProd', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prodId: id,
        cartId: this.state.cartId,
        quantity,
        price,
      }),
    }).then((res) => {
      if (res.ok) {
        this.fetchItemsFromServer()
      }
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  buyHandler = () => {
    if (creditCardType(this.state.number).length > 0) {
      fetch('/cart/purchase', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId: this.state.cartId }),
      }).then(async res=>{
        if(res.ok){
          alert('Compra realizada com sucesso!')
          this.setState({redirect:'/client/produtos'})
        }else{
          const err = await res.json()
          alert('Erro ao finalizar a compra! '+ err.error)
        }
      })
    }
  }

  render() {
    let shops = this.state.itemsData.map((item) => {
      return (
        <CartItem
          id={item.id}
          imgSrc={`http://localhost:5000/${item.imgSrc}`}
          name={item.name}
          quantity={item.quantity}
          deleteProductHandler={this.deleteProductHandler}
          changeQuantityHandler={this.changeQuantityHandler}
          price={item.price}
        />
      )
    })

    return (
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}
      >
        <Redirect to={this.state.redirect} />
        <ShopCartPanel items={shops} />
        <div
          className='formAgendar shadow'
          style={{
            height: '22em',
            width: '20em',
            marginLeft: '1em',
            justifyContent: 'center',
            paddingBottom: '3em',
          }}
        >
          <input
            className='nameInput'
            placeholder='Número do cartão'
            name='number'
            value={this.state.number}
            onChange={this.handleChange}
          />
          <input
            className='nameInput'
            placeholder='Nome Impresso no Cartão'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <ReactInputMask
            mask='99/99'
            className='nameInput'
            placeholder='Válido até'
            name='expiry'
            value={this.state.expiry}
            onChange={this.handleChange}
          />
          <ReactInputMask
            mask='999'
            className='nameInput'
            placeholder='CVC'
            name='cvc'
            value={this.state.cvc}
            onChange={this.handleChange}
          />
          <h3>Total : R$ {Number(this.state.totalPrice).toFixed(2)}</h3>
          <button onClick={this.buyHandler}> Comprar </button>
        </div>
      </main>
    )
  }
}

export default ShopCartScreen
