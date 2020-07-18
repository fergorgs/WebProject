import React from 'react'
import '../style.css'
import { Redirect } from 'react-router-dom'

class ShowerBookingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cpf: '',
      animalName: '',
      date: '',
      hour: '',
      service: '',
      cost: '0,00',
      pets: [<option>Selecione um animal</option>],
      redirect:'/client/agendamentos'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const cpf = JSON.parse(sessionStorage.getItem('client')).client.cpf
    this.setState({ cpf })
    fetch('/service/clientPet', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf }),
    }).then(async (res) => {
      if (res.ok) {
        let names = await res.json()
        this.setState({ animalName: names[0] })
        names = names.map((name) => {
          return <option>{name}</option>
        })
        this.setState({ pets: names })
      } else {
        const error = await res.json()
        alert(error.error)
        this.setState({
          pets: [<option>Nenhum pet registrado</option>],
        })
      }
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }
  
  serviceHandler = (event) => {
    let val = event.target.value
    this.setState({service:val})
    if (val == 'Serviço') this.setState({ cost: '0,00' })
    else if (val == 'Só banho') this.setState({ cost: '20,00' })
    else if (val == 'Só tosa') this.setState({ cost: '35,00' })
    else if (val == 'Banho e tosa') this.setState({ cost: '55,00' })
    else if (val == 'Consulta') this.setState({ cost: '45,00' })
  }
  agendarHandler = (event) => {
    const date = new Date(`${this.state.date}:${this.state.hour}`)
    if (date > Date.now()) {
      const data = {
        date,
        serviceType: this.state.service,
        clientCpf: this.state.cpf,
        clientPetName: this.state.animalName,
      }
      fetch('/service/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        if (res.ok) {
          alert('Serviço registrado com sucesso!')
          this.setState({ redirect: '/client/produtos' })
        } else {
          const error = await res.json()
          alert(error.error)
        }
      })
    } else {
      alert('Tempo ou data inválidos!')
    }
  }

  render() {
    return (
      <main>
        <Redirect to={this.state.redirect} />
        <div class='formAgendarHolder'>
          <div class='formAgendar'>
            <h1>Agendamento de Serviços</h1>
            <select
              style={{ width: '22em' }}
              name='animalName'
              value={this.state.animalName}
              onChange={this.handleChange}
            >
              {this.state.pets}
            </select>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <input
                type='date'
                class='timeInput'
                name='date'
                onChange={this.handleChange}
              />
              <input
                type='time'
                class='timeInput'
                name='hour'
                onChange={this.handleChange}
              />
            </div>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <select onChange={this.serviceHandler}>
                <option>Serviço</option>
                <option>Só banho</option>
                <option>Só tosa</option>
                <option>Banho e tosa</option>
                <option>Consulta</option>
              </select>
            </div>
            <br />
            <h3>Custo: R$ {this.state.cost}</h3>
            <button type='submit' onClick={this.agendarHandler.bind(this)}>Agendar</button>
          </div>
        </div>
      </main>
    )
  }
}

export default ShowerBookingScreen
