import React from 'react'
import '../style.css'
import ReactInputMask from 'react-input-mask'
import creditCardType from 'credit-card-type'
import { Redirect } from 'react-router-dom'

class PetDetailsCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
      redirect: `/client/adocao/${this.props.id}`,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    this.setState({ quantity: 1 })
  }

  changeQuantityHandler = (event) => {
    this.setState({ quantity: event.target.value })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  purchaseOrAdoptHandler = (event) => {
    if (
      event.target.name === 'adopt' ||
      creditCardType(this.state.number).length > 0
    ) {
      fetch(`/animal/${event.target.name}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerId: JSON.parse(sessionStorage.getItem('client')).client._id,
          petId: this.props.id,
        }),
      }).then(async (res) => {
        if (res.ok) {
          alert(
            `${
              event.target.name === 'adopt' ? 'Adoção' : 'Compra'
            } realizada com sucesso!`
          )
          this.setState({ redirect: '/client/perfil' })
        } else {
          const err = await res.json()
          alert(err.error)
        }
      })
    } else {
      alert('Número de cartão inválido!')
    }
  }

  render() {
    if (this.props.adoptionMethod === 'Adoção') {
      return (
        <div id='productCardHolder'>
          <Redirect to={this.state.redirect} />
          <div id='productCard'>
            <div style={{ display: 'flex' }}>
              <img
                alt={this.props.race}
                src={this.props.imgSrc}
                id='productImage'
              />
              <div style={{ display: 'unset', marginLeft: '2em' }}>
                <h2>{this.props.name}</h2>
                <p class='productDescription'>Especie: {this.props.specie}</p>
                <p class='productDescription'>Idade: {this.props.age}</p>
                <p class='productDescription'>Sexo: {this.props.sex}</p>
                <h3>Animal para adoção</h3>
                <button
                  onClick={this.purchaseOrAdoptHandler}
                  name='adopt'
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
      <div id='productCardHolder' style={{ alignItems: 'center' }}>
        <Redirect to={this.state.redirect} />
        <div id='productCard'>
          <div style={{ display: 'flex' }}>
            <img
              alt={this.props.species}
              src={this.props.imgSrc}
              id='productImage'
            />
            <div style={{ display: 'unset', marginLeft: '2em' }}>
              <h2>{this.props.name}</h2>
              <p class='productDescription'>Especie: {this.props.specie}</p>
              <p class='productDescription'>Idade: {this.props.age}</p>
              <p class='productDescription'>Sexo: {this.props.sex}</p>
              <h3>Preço: R${this.props.price}</h3>
            </div>
          </div>
        </div>
        <div
          className='productCardHolder formAgendar shadow'
          style={{
            height: '22em',
            width: '20em',
            marginLeft: '1em',
            justifyContent: 'center',
          }}
        >
          <input
            className='nameInput'
            placeholder='Número do cartão'
            name='number'
            onChange={this.handleChange}
          />
          <input
            className='nameInput'
            placeholder='Nome Impresso no Cartão'
            name='name'
            onChange={this.handleChange}
          />
          <ReactInputMask
            mask='99/99'
            className='nameInput'
            placeholder='Válido até'
            name='expiry'
            onChange={this.handleChange}
          />
          <ReactInputMask
            mask='999'
            className='nameInput'
            placeholder='CVC'
            name='cvc'
            onChange={this.handleChange}
          />
          <button
            onClick={this.purchaseOrAdoptHandler}
            style={{ marginTop: '1em' }}
            name='purchase'
          >
            Comprar
          </button>
        </div>
      </div>
    )
  }
}

export default PetDetailsCard
