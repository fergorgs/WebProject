import React from 'react'
import '../style.css'
import { Link } from 'react-router-dom'
import PetCard from './PetCard'

class OwnedPetsPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      race: '',
      age: '',
      id: '',
      pets: [],
      message: '',
    }
  }
  componentDidMount() {
    let clientId = JSON.parse(sessionStorage.getItem('client')).client._id
    let pets = []
    fetch('/pet/getClientPets', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientId }),
    }).then(async (res) => {
      if (res.ok) {
        pets = await res.json()
        if (Array.isArray(pets)) this.setState({ pets: pets })
      } else {
        const err = await res.json()
        this.setState({ message: err.error })
      }
    })
  }
  componentWillMount() {
    this.setState({ remove: false })
  }

  removeButtonHandler = () => {
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
          <div id='perfilPets'>
            {this.state.message !== '' ? this.state.message : pets}
          </div>
        </div>
      </div>
    )
  }
}

export default OwnedPetsPanel
