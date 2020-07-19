import React from 'react'
import '../style.css'
import { Link } from 'react-router-dom'
import AdoptionPanel from './AdoptionPanel'
import AdoptionItem from './AdoptionItem'
import dogPlaceHolder from './images/dog.jpg'
import catPlaceHolder from './images/gato_site.png'

class AdoptionScreen extends React.Component {
  componentWillMount() {
    this.setState({
      dog: true,
      cat: true,
      adopt: true,
      sell: true,
    })
  }

  fetchPetsFromServer() {
    //fetch fetch fetch

    return [
      {
        id: '43a',
        sex: 'male',
        imgSrc: dogPlaceHolder,
        species: 'dog',
        type: 'sell',
        name: 'DogSell',
        race: 'Beagle',
        age: '6',
      },
      {
        id: '43b',
        sex: 'female',
        imgSrc: catPlaceHolder,
        species: 'cat',
        type: 'adopt',
        name: 'CatAdopt',
        race: 'Persa',
        age: '4',
      },
      {
        id: '43c',
        sex: 'male',
        imgSrc: catPlaceHolder,
        species: 'cat',
        type: 'adopt',
        name: 'CatAdopt',
        race: 'Persa',
        age: '4',
      },
      {
        id: '43d',
        sex: 'male',
        imgSrc: catPlaceHolder,
        species: 'cat',
        type: 'sell',
        name: 'CatSell',
        race: 'Persa',
        age: '4',
      },
      {
        id: '43e',
        sex: 'female',
        imgSrc: dogPlaceHolder,
        species: 'dog',
        type: 'sell',
        name: 'DogSell',
        race: 'Beagle',
        age: '6',
      },
      {
        id: '43f',
        sex: 'female',
        imgSrc: dogPlaceHolder,
        species: 'dog',
        type: 'sell',
        name: 'DogSell',
        race: 'Beagle',
        age: '6',
      },
      {
        id: '43g',
        sex: 'female',
        imgSrc: dogPlaceHolder,
        species: 'dog',
        type: 'adopt',
        name: 'DogAdopt',
        race: 'Beagle',
        age: '6',
      },
      {
        id: '43h',
        sex: 'male',
        imgSrc: catPlaceHolder,
        species: 'cat',
        type: 'adopt',
        name: 'CatAdopt',
        race: 'Persa',
        age: '4',
      },
    ]
  }

  toggleCat = () => {
    this.setState({ cat: !this.state.cat })
  }
  toggleDog = () => {
    this.setState({ dog: !this.state.dog })
  }
  toggleAdopt = () => {
    this.setState({ adopt: !this.state.adopt })
  }
  toggleSell = () => {
    this.setState({ sell: !this.state.sell })
  }

  render() {
    const match = this.props.match

    let pets = this.fetchPetsFromServer().map((pet) => {
      let add = false

      if (this.state.dog == true && pet.species == 'dog') {
        if (this.state.adopt == true && pet.type == 'adopt') add = true
        else if (this.state.sell == true && pet.type == 'sell') add = true
      } else if (this.state.cat == true && pet.species == 'cat') {
        if (this.state.adopt == true && pet.type == 'adopt') add = true
        else if (this.state.sell == true && pet.type == 'sell') add = true
      }

      if (add)
        return (
          <Link
            to={`${match.path}/` + pet.id}
            style={{ textDecoration: 'none' }}
          >
            <AdoptionItem
              imgSrc={pet.imgSrc}
              species={pet.species}
              type={pet.type}
              name={pet.name}
              race={pet.race}
              age={pet.age}
            />
          </Link>
        )

      //return null
    })

    return (
      <div id='displayPanelHolder'>
        <h2>Nossos animais estão buscando um lar!</h2>
        <div id='filtros'>
          <p>Filtrar:</p>
          <input
            type='checkbox'
            id='gatos'
            name='Gatos'
            checked={this.state.cat}
            onChange={this.toggleCat}
          />
          <label>Gatos</label>
          <input
            type='checkbox'
            id='cachorros'
            name='Cachorros'
            checked={this.state.dog}
            onChange={this.toggleDog}
          />
          <label>Cachorros</label>
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
        <AdoptionPanel items={pets} />
      </div>
    )
  }
}

export default AdoptionScreen
