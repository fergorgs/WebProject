import React from 'react'
import '../style.css'
import ShopCartPanel from './ShopCartPanel'
import CartItem from './CartItem'

class ShopCartScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPrice: 0,
      itemsData: [],
    }
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
        this.setState({ totalPrice: cart.totalPrice })
        const items = cart.products.map((prod) => {
          return {
            id: prod.id,
            imgSrc: prod.photo,
            name: prod.name,
            price: prod.price,
            quantity:prod.quantity
          }
        })
        this.setState({itemsData:items})
      }
    })
  }

  componentDidMount() {
    this.fetchItemsFromServer()
  }

  buyHandler = () => {
    for (let {} in this.state.itemsData) {
      //finds on stock the product with the equivalent ID
      //and subtracts 1 from the total amount
    }

    alert('Compra concluida!')
  }

  render() {
    let shops = this.state.itemsData.map((item) => {
      return (
        <CartItem
          id={item.id}
          imgSrc={`http://localhost:5000/${item.imgSrc}`}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
        />
      )
    })

    return (
      <ShopCartPanel
        items={shops}
        totalCost={this.state.totalPrice}
        buyHandler={this.buyHandler}
      />
    )
  }
}

export default ShopCartScreen
