import React from 'react'
import InputMask from 'react-input-mask'
import '../style.css'
import { Redirect } from 'react-router-dom'
import BookingTable from '../cliente/BookinTable'

class ServiceRegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      service: 'Tosa',
      date: null,
      cost: '0.00',
      animalName: '',
      cpf: '',
      pets: [<option>Digite o CPF do cliente</option>],
      petsDisabled: true,
      redirect: '/admin/registro/servicos',
      formattedDate: '',
      freeSlots: [],
      selected: null,
      date: new Date(),
    }
    this.handleChange = this.handleChange.bind(this)
  }

  submitHandler = () => {
    const date = new Date(this.state.date)
    date.setHours(this.state.selected)
    if (date > Date.now()) {
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
          alert(
            `Serviço registrado com sucesso!\nFavor cobrar R$${Number(
              this.state.cost
            ).toFixed(2)} no caixa`
          )
          this.setState({ redirect: '/admin/servicos' })
        } else {
          const error = await res.json()
          alert(error.error)
        }
      })
    } else {
      alert('Tempo ou data inválidos!')
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  getPets(event) {
    const cpf = event.target.value
    //Regex teste cpf
    if (/(^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$)/g.test(cpf)) {
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
          this.setState({ pets: names, petsDisabled: false })
        } else {
          const error = await res.json()
          alert(error.error)
          this.setState({
            pets: [<option>Digite o CPF do cliente</option>],
            petsDisabled: true,
          })
        }
      })
    }
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

  serviceHandler = (event) => {
    let val = event.target.value
    this.setState({ service: val })
    if (val === 'Serviço') this.setState({ cost: 0 })
    else if (val === 'Só banho') this.setState({ cost: 20 })
    else if (val === 'Só tosa') this.setState({ cost: 35 })
    else if (val === 'Banho e tosa') this.setState({ cost: 55 })
    else if (val === 'Consulta') this.setState({ cost: 45 })
  }

  componentDidMount() {
    this.getFreeSlots(this.state.date)
  }
  render() {
    return (
      <main>
        <Redirect to={this.state.redirect} />
        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <h1>Novo Serviço</h1>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <select
                onChange={this.serviceHandler}
                value={this.state.service}
                name='service'
              >
                <option>Só banho</option>
                <option>Só tosa</option>
                <option>Banho e tosa</option>
                <option>Consulta</option>
              </select>
            </div>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <input
                type='date'
                name='date'
                class='timeInput'
                onChange={(ev) => {
                  this.getFreeSlots(new Date(`${ev.target.value}:0:0:0`))
                }}
              />
            </div>
            <InputMask
              mask='999.999.999-99'
              type='text'
              name='cpf'
              onBlur={this.getPets.bind(this)}
              placeholder='CPF do Cliente'
              class='nameInput'
              onChange={this.handleChange}
            />
            <div style={{ display: 'flex' }}>
              <select
                name='animalName'
                placeholder='Nome do animal'
                disabled={this.state.petsDisabled}
                value={this.state.animalName}
                onChange={this.handleChange}
              >
                {this.state.pets}
              </select>
            </div>
              <h3>Custo: R${Number(this.state.cost).toFixed(2)}</h3>
            <button type='submit' onClick={this.submitHandler}>
              Confirmar
            </button>
          </div>
          <BookingTable
            date={this.state.date}
            freeSlots={this.state.freeSlots}
            selectHour={(hour) => {
              this.setState({ selected: hour })
            }}
          />
        </div>
      </main>
    )
  }
}

export default ServiceRegisterForm
