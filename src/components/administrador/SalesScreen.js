import React from 'react';
import '../style.css'
import SalesTable from './SalesTable'




class SalesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          salesData: [],
        }
      }
    
      fetchSalesFromServer() {
        //fetch fetch fetch
        // fetch('/cart/get', {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     clientId: JSON.parse(sessionStorage.getItem('client')).client._id,
        //   }),
        // }).then(async (res) => {
        //   if (res.ok) {
        //     let cart = await res.json()
        //     cart = cart.cart
        //     this.setState({ totalPrice: cart.totalPrice })
        //     const items = cart.products.map((prod) => {
        //       return {
        //         id: prod.id,
        //         imgSrc: prod.photo,
        //         name: prod.name,
        //         price: prod.price,
        //         quantity:prod.quantity
        //       }
        //     })
        //     this.setState({itemsData:items})
        //   }
        // })
      }
    
      componentDidMount() {
        this.fetchSalesFromServer()
      }
    
      render() {
        // let shops = this.state.itemsData.map((item) => {
        //   return (
        //     <CartItem
        //       id={item.id}
        //     //   imgSrc={`http://localhost:5000/${item.imgSrc}`}
        //       imgSrc={placeHolder}
        //       name={item.name}
        //       quantity={item.quantity}
        //       price={item.price}
        //     />
        //   )
        // })
    
        return (
            <SalesTable/>
        )
      }
    }

export default SalesScreen;