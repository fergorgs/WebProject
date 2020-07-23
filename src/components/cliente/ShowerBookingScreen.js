import React from 'react'
import '../style.css'
import { Redirect } from 'react-router-dom'
import BookingTable from './BookinTable'
import ReactInputMask from 'react-input-mask'
import creditCardType from 'credit-card-type'

class ShowerBookingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cpf: '',
      animalName: '',
      date: '',
      service: '',
      cost: '0,00',
      pets: [<option>Selecione um animal</option>],
      redirect: '/client/agendamentos',
      date: new Date(),
      formattedDate: '',
      freeSlots: [],
      selected: null,
      number: '',
      expiry: '',
      name: '',
      cvc: '',
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
        this.getFreeSlots(new Date())
      } else {
        const error = await res.json()
        alert(error.error)
        this.setState({
          pets: [<option>Nenhum pet registrado</option>],
        })
      }
    })
  }

  getFreeSlots = (date) => {
    this.setState({ date: date }, () => {
      fetch('/service/getFreeSlots', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: this.state.date }),
      }).then(async (res) => {
        if (res.ok) {
          const freeSlots = await res.json()
          this.setState({ freeSlots: freeSlots.freeSlots })
        }
      })
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
    this.setState({ service: val })
    if (val === 'Serviço') this.setState({ cost: '0,00' })
    else if (val === 'Só banho') this.setState({ cost: '20,00' })
    else if (val === 'Só tosa') this.setState({ cost: '35,00' })
    else if (val === 'Banho e tosa') this.setState({ cost: '55,00' })
    else if (val === 'Consulta') this.setState({ cost: '45,00' })
  }
  agendarHandler = () => {
    if (
      this.state.name === '' ||
      this.state.number === '' ||
      this.state.expiry === '' ||
      this.state.cvc === ''
    ) {
      alert('Preencha todos os campos')
    } else {
      if(creditCardType(this.state.number).length === 0){
        alert('Número de cartão inválido')
        return
      } 
      const date = new Date(this.state.date)
      date.setHours(this.state.selected, 0, 0)
      console.log(date)
      if (date > Date.now() && this.state.selected !== '') {
        const data = {
          date,
          serviceType: this.state.service,
          clientCpf: this.state.cpf,
          clientPetName: this.state.animalName,
          value: this.state.cost,
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
  }

  render() {
    return (
      <main>
        <Redirect to={this.state.redirect} />
        <div class='formAgendarHolder'>
          <div class='formAgendar shadow'>
            <h1>Agendamento de Serviços</h1>
            <div>
              <select
                style={{ width: '22em' }}
                name='animalName'
                value={this.state.animalName}
                onChange={this.handleChange}
              >
                {this.state.pets}
              </select>
            </div>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <input
                type='date'
                class='timeInput'
                name='date'
                onChange={(ev) => {
                  const data = new Date(ev.target.value)
                  data.setDate(data.getDate() + 1)
                  data.setHours(0, 0, 0)
                  this.getFreeSlots(data)
                }}
              />
            </div>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <select onChange={this.serviceHandler}>
                <option disabled={true} selected={true}>
                  Serviço
                </option>
                <option>Só banho</option>
                <option>Só tosa</option>
                <option>Banho e tosa</option>
                <option>Consulta</option>
              </select>
            </div>
            <br />
            <h3>Custo: R$ {this.state.cost}</h3>
          </div>

          <BookingTable
            freeSlots={this.state.freeSlots}
            select={this.state.selected}
            date={this.state.date}
            selectHour={(hour) => {
              this.setState({ selected: hour })
            }}
          />
          <div
            className='formAgendar shadow'
            style={{
              height: '22em',
              width: '20em',
              marginLeft: '2em',
              justifyContent: 'center',
              paddingBottom: '3em',
            }}
          >
            <input
              className='nameInput'
              placeholder='Número do cartão'
              name='number'
              value={this.state.number}
              onChange={this.handleChange}
            />
            <input
              className='nameInput'
              placeholder='Nome Impresso no Cartão'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
            <ReactInputMask
              mask='99/99'
              className='nameInput'
              placeholder='Válido até'
              name='expiry'
              value={this.state.expiry}
              onChange={this.handleChange}
            />
            <ReactInputMask
              mask='999'
              className='nameInput'
              placeholder='CVC'
              name='cvc'
              value={this.state.cvc}
              onChange={this.handleChange}
            />
            <button onClick={this.agendarHandler.bind(this)}> Agendar </button>
          </div>
        </div>
      </main>
    )
  }
}

export default ShowerBookingScreen
