import React from 'react'
import '../style.css'
import Carousel from './Carousel'
import range from 'lodash/range'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import ProductItem from './ProductItem'
import placeHolder from './images/golden.jpg'
import placeHolder2 from './images/racaogato.jpeg'

class ProductsScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      products: [],
      match: this.props.match,
    }
  }

  fetchProductsFromServer() {
    let items = []
    fetch('/product/get', {
      method: 'GET',
    }).then(async (res) => {
      if (res.ok) {
        const result = await res.json()
        items = result.products.map((product) => {
          return {
            imgSrc: product.photo,
            type: product.type,
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            sale: product.sale,
            id: product._id,
          }
        })
        const promo = items.filter((item) => {
          return item.sale
        }).map(item=> { return item })

        const racao = items.filter((item) => {
          return item.type === 'Ração Gato' || item.type === 'Ração Cão'
        }).map(item => { return item })

        const outros = items.filter((item) => {
          return promo.indexOf(item) === -1 && racao.indexOf(item) === -1
        }).map(item=> { return item })

        this.setState({
          products: [
            { name: 'Promoções da Semana', items: promo },
            { name: 'Ração para Gatos e Cachorros', items: racao },
            { name: 'Outros', items: outros },
          ],
        })
      } else {
        alert('Erro ao resgatar produtos')
      }
    })
    
  }


  componentDidMount(){
    this.fetchProductsFromServer()
  }

  render() {
    const match = this.props.match

    const receivedContent = this.state.products.map(function (slider) {
      let items = slider.items.map(function (item) {
        return (
          <Link
            to={`${match.path}/` + item.id}
            style={{ textDecoration: 'none' }}
          >
            <ProductItem
              imgSrc={`http://localhost:5000/${item.imgSrc}`}
              name={item.name}
              price={item.price}
            />
          </Link>
        )
      })

      return (
        <Carousel name={slider.name} cardsPerPage={7}>
          {items}
        </Carousel>
      )
      //<ProducSlider name={slider.name} items={items}/>
    })

    return (
      <div>
        <main>
          {receivedContent}
          {/* <Carousel cardsPerPage={7} name='My name'>
                        {test}
                    </Carousel> */}
        </main>
      </div>
    )
  }
}

export default ProductsScreen
