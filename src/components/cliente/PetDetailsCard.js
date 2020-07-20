import React from 'react'
import '../style.css'

class PetDetailsCard extends React.Component {
  componentWillMount() {
    this.setState({ quantity: 1 })
  }

  changeQuantityHandler = (event) => {
    this.setState({ quantity: event.target.value })
  }

  buyHandler = () => {
    alert('Item adicionado ao carrinho!')
  }

  render() {
    if (this.props.adoptionMethod === 'Adoção') {
      return (
        <div id='productCardHolder'>
          <div id='productCard'>
            <div style={{ display: 'flex' }}>
              <img alt={this.props.race} src={this.props.imgSrc} id='productImage' />
              <div style={{ display: 'unset', marginLeft: '2em' }}>
                <h2>{this.props.name}</h2>
                <p class='productDescription'>Especie: {this.props.specie}</p>
                <p class='productDescription'>Idade: {this.props.age}</p>
                <p class='productDescription'>Sexo: {this.props.sex}</p>
                <h3>Animal para adoção</h3>
                <button
                  onClick={this.buyHandler}
                  style={{ marginLeft: '0', marginTop: '1em' }}
                >
                  Adotar
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div id='productCardHolder'>
        <div id='productCard'>
          <div style={{ display: 'flex' }}>
            <img alt={this.props.species} src={this.props.imgSrc} id='productImage' />
            <div style={{ display: 'unset', marginLeft: '2em' }}>
              <h2>{this.props.name}</h2>
              <p class='productDescription'>Especie: {this.props.specie}</p>
              <p class='productDescription'>Idade: {this.props.age}</p>
              <p class='productDescription'>Sexo: {this.props.sex}</p>
              <h3>Preço: R${this.props.price}</h3>
              <button
                onClick={this.buyHandler}
                style={{ marginLeft: '0', marginTop: '1em' }}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PetDetailsCard
