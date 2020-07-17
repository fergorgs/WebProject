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
    fetch('http://localhost:5000/pet/getClientPets', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({petsId:pets}),
    }).then(async res=>{
      pets = await res.json() 
      this.setState({pets:pets})
    })    
    
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
          imgSrc={pet.photo}
          name={pet.name}
          race={pet.breed}
          age={pet.age}
          id={pet._id}
          sex={pet.gender}
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
