import React from 'react'
import '../style.css'
import { Link } from 'react-router-dom'
import AdoptionPanel from './AdoptionPanel'
import AdoptionItem from './AdoptionItem'

class AdoptionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { adopt: true, sell: true, pets: [] }
  }

  fetchPetsFromServer() {
    //fetch fetch fetch
    fetch('/animal/get', { method: 'GET' }).then(async (res) => {
      if (res.ok) {
        const pets = await res.json()
        this.setState({ pets: pets.animals })
      }
    })
  }

  toggleAdopt = () => {
    this.setState({ adopt: !this.state.adopt })
  }
  toggleSell = () => {
    this.setState({ sell: !this.state.sell })
  }

  componentDidMount() {
    this.fetchPetsFromServer()
  }

  render() {
    const match = this.props.match

    const petsRendered = this.state.pets.map((pet) => {
      let add = false
      if (this.state.adopt === true && pet.adoptionMethod === 'Adoção')
        add = true
      else if (this.state.sell === true && pet.adoptionMethod === 'Venda')
        add = true
      if (add)
        return (
          <Link
            to={`${match.path}/` + pet._id}
            style={{ textDecoration: 'none' }}
          >
            <AdoptionItem
              imgSrc={`http://localhost:5000/${pet.photo}`}
              specie={pet.specie}
              type={pet.adoptionMethod}
              name={pet.name}
              race={pet.breed}
              age={pet.age}
              price={pet.price}
            />
          </Link>
        )
    })

    return (
      <div id='displayPanelHolder'>
        <h2>Nossos animais estão buscando um lar!</h2>
        <div id='filtros'>
          Filtrar:
          <input
            type='checkbox'
            id='adocao'
            name='Adocao'
            checked={this.state.adopt}
            onChange={this.toggleAdopt}
          />
          <label>Adoção</label>
          <input
            type='checkbox'
            id='venda'
            name='Venda'
            checked={this.state.sell}
            onChange={this.toggleSell}
          />
          <label>Venda</label>
        </div>
        {petsRendered.length > 0 ? (
          <AdoptionPanel items={petsRendered} />
        ) : (
          <div
            style={{
              marginTop: '3em',
              height: '20em',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <h3>Nenhum animal disponível para venda ou adoção</h3>
          </div>
        )}
      </div>
    )
  }
}

export default AdoptionScreen
