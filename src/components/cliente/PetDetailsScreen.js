import React from 'react'
import '../style.css'
import PetDetailsCard from './PetDetailsCard'

class PetDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animal: {},
    }
  }

  fetchPetDetailsFromServer() {
    const url = `/animal/${this.props.match.params.id}`
    console.log(url)
    fetch(url, { method: 'GET' }).then(async (res) => {
      if (res.ok) {
        let animal = await res.json()
        animal = animal.animal
        this.setState({ animal: animal })
      }
    })
  }

  componentDidMount() {
    this.fetchPetDetailsFromServer()
  }

  render() {
    return (
      <div>
        <main>
          <PetDetailsCard
            imgSrc={`http://localhost:5000/${this.state.animal.photo}`}
            adoptionMethod={this.state.animal.adoptionMethod}
            price={this.state.animal.price}
            age={this.state.animal.age}
            race={this.state.animal.race}
            sex={this.state.animal.gender}
            name={this.state.animal.name}
            specie={this.state.animal.specie}
          />
        </main>
      </div>
    )
  }
}

export default PetDetailsScreen
