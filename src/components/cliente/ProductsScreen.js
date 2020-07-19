import React from 'react'
import '../style.css'
import Carousel from './Carousel'
import range from 'lodash/range'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import ProductItem from './ProductItem'
import placeHolder from './images/golden.jpg'
import placeHolder2 from './images/racaogato.jpeg'

class ProductsScreen extends React.Component {
  fetchProductsFromServer() {
    // fetch fetch fetch
    
    return [
      {
        name: 'Promoções da Semana',
        items: [
          { id: '111', name: 'Test 1', imgSrc: placeHolder, price: 'FF' },
          { id: '112', name: 'Test 2', imgSrc: placeHolder2, price: 'FF' },
          { id: '113', name: 'Test 3', imgSrc: placeHolder2, price: 'FF' },
          { id: '114', name: 'Test 4', imgSrc: placeHolder, price: 'FF' },
          { id: '115', name: 'Test 5', imgSrc: placeHolder, price: 'FF' },
          { id: '116', name: 'Test 6', imgSrc: placeHolder2, price: 'FF' },
          { id: '117', name: 'Test 7', imgSrc: placeHolder, price: 'FF' },
          { id: '118', name: 'Test 8', imgSrc: placeHolder2, price: 'FF' },
        ],
      },
      {
        name: 'Rações para Cachorro',
        items: [
          { id: '119', name: 'Test A', imgSrc: placeHolder, price: 'HH' },
          { id: '120', name: 'Test B', imgSrc: placeHolder2, price: 'HH' },
          { id: '121', name: 'Test C', imgSrc: placeHolder, price: 'HH' },
        ],
      },
      {
        name: 'Rações para Gato',
        items: [
          { id: '122', name: 'Test X', imgSrc: placeHolder2, price: 'PP' },
          { id: '123', name: 'Test Y', imgSrc: placeHolder, price: 'PP' },
          { id: '124', name: 'Test Z', imgSrc: placeHolder2, price: 'PP' },
        ],
      },
    ]
  }

  componentWillMount() {
    this.setState({
      products: this.fetchProductsFromServer(),
      match: this.props.match,
    })
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
              imgSrc={item.imgSrc}
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
