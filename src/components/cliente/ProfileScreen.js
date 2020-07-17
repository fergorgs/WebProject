import React from 'react'
import '../style.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import ProfileCard from './ProfileCard'
import OwnedPetsPanel from './OwnedPetsPanel'
import profilePlaceHolder from './images/coffinGuy.jpg'
import petPlaceHolder from './images/dog2.jpeg'
import PetCard from './PetCard'

class AdoptionScreen extends React.Component {
  constructor(args) {
    super(args)
    this.state = {
      id: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      cpf: '',
    }
  }


  fetchPetsInfo() {
    //fetch fetch fetch

    return [
      {
        imgSrc: petPlaceHolder,
        name: 'Gilberto',
        race: 'Beagle',
        age: '6',
        id: '155364',
      },
    ]
  }

  removePetHandler = (id) => {
    alert('removed pet id: ' + id)
    this.setState({})
  }

  render() {
    return (
      <main id='profileHolder'>
        <div
          class='perfilHolder'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ProfileCard />
          <OwnedPetsPanel
            itemsData={this.fetchPetsInfo(this.state.id)}
            removePetHandler={this.removePetHandler}
            match={this.props.match}
          />
        </div>
      </main>
    )
  }
}

export default AdoptionScreen
