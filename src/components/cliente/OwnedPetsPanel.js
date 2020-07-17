import React from 'react'
import '../style.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import PetCard from './PetCard'

class OwnedPetsPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      race: '',
      age: '',
      id: '',
      pets:[]
    }
  }
  componentDidMount() {
    let pets = JSON.parse(localStorage.getItem('client')).client.pets
    console.log(pets)
    this.setState({pets:pets})
  }
  componentWillMount() {
    this.setState({ remove: false })
  }

  removeButtonHandler = (event) => {
    this.setState({ remove: !this.state.remove })
  }

  render() {
    const pets = this.state.pets.map((pet) => {
      return (
        <PetCard
          imgSrc={pet.imgSrc}
          name={pet.name}
          race={pet.race}
          age={pet.age}
          id={pet.id}
          removeMode={this.state.remove}
          removePetHandler={this.props.removePetHandler}
        />
      )
    })

    return (
      <div>
        <div id='petBox'>
          <div style={{ textAlign: 'right' }}>
            <button type='submit' onClick={this.removeButtonHandler}>
              Remover
            </button>
            <Link
              to={`${this.props.match.path}/novo_pet`}
              style={{ textDecoration: 'none' }}
            >
              <button type='submit'>Adicionar</button>
            </Link>
          </div>
          <div id='perfilPets'>{pets}</div>
        </div>
      </div>
    )
  }
}

export default OwnedPetsPanel
