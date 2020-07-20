import React from 'react'
import '../style.css'
import { Redirect } from 'react-router-dom'
import ServiceTable from '../administrador/ServiceTable'

function getDiaSemana(dia) {
  let diaSemana
  switch (dia) {
    case 0:
      diaSemana = 'Domingo'
      break
    case 1:
      diaSemana = 'Segunda'
      break
    case 2:
      diaSemana = 'Terça'
      break
    case 3:
      diaSemana = 'Quarta'
      break
    case 4:
      diaSemana = 'Quinta'
      break
    case 5:
      diaSemana = 'Sexta'
      break
    case 6:
      diaSemana = 'Sábado'
      break
    case 7:
      diaSemana = 'Domingo'
      break
  }
  return diaSemana
}

function getNomeMes(mes) {
  let nomeMes
  switch (mes - 1) {
    case 0:
      nomeMes = 'Janeiro'
      break
    case 1:
      nomeMes = 'Fevereiro'
      break
    case 2:
      nomeMes = 'Março'
      break
    case 3:
      nomeMes = 'Abril'
      break
    case 4:
      nomeMes = 'Maio'
      break
    case 5:
      nomeMes = 'Junho'
      break
    case 6:
      nomeMes = 'Julho'
      break
    case 7:
      nomeMes = 'Agosto'
      break
    case 8:
      nomeMes = 'Setembro'
      break
    case 9:
      nomeMes = 'Outubro'
      break
    case 10:
      nomeMes = 'Novembro'
      break
    case 11:
      nomeMes = 'Dezembro'
      break
  }
  return nomeMes
}


function dataFormatada(date) {
  let data = date,
    dia = data.getDate().toString().padStart(2, '0'),
    mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
    ano = data.getFullYear(),
    diaSemana = data.getDay()
  
  return `${getDiaSemana(diaSemana)}, ${dia} de ${getNomeMes(mes)} de ${ano}`
}

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
      redirect:'/client/agendamentos',
      date: new Date(),
      formattedDate: '',
      services: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    const newDate = dataFormatada(this.state.date)
    this.setState({ formattedDate: newDate })
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

  onChange = (date) => {
    this.setState({ date: date, formattedDate: dataFormatada(date) })
    fetch('/service/getByDate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    }).then(async (res) => {
      if (res.ok) {
        const services = await res.json()
        this.setState({ services })
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
                onChange={this.onChange}
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
        
        <ServiceTable
          formattedDate={this.state.formattedDate}
          services={this.state.services}
        />
        </div>
      </main>
    )
  }
}

export default ShowerBookingScreen
