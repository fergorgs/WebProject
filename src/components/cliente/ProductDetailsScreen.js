import React from 'react'
import '../style.css'
import ProductCard from './ProductCard'

class ProductDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        name: '',
        imgSrc: '',
        description: '',
        price: '',
      },
    }
  }

  fetchProductDetailsFromServer(id) {
    fetch(`/product/${id}`, {
      method: 'GET',
    }).then(async (res) => {
      if (res.ok) {
        const result = await res.json()
        console.log(result)
        this.setState({ item: result.product })
      }
    })
  }

  componentDidMount() {
    this.fetchProductDetailsFromServer(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <main>
          <ProductCard
            name={this.state.item.name}
            imgSrc={`http://localhost:5000/${this.state.item.photo}`}
            description={this.state.item.description}
            price={this.state.item.price}
            id={this.props.match.params.id}
          />
        </main>
      </div>
    )
  }
}

export default ProductDetailsScreen
