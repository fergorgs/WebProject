import React from 'react'
import '../style.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'

class AppointmentBookingScreen extends React.Component {
  componentWillMount() {
    this.setState({
      cpf: '',
      animalName: '',
      date: '',
      hour: '',
    })
  }

  cpfHandler = (event) => {
    this.setState({ cpf: event.target.value })
  }
  animalNameHandler = (event) => {
    this.setState({ animalName: event.target.value })
  }
  dateHandler = (event) => {
    this.setState({ date: event.target.value })
  }
  timeHandler = (event) => {
    this.setState({ time: event.target.value })
  }
  agendarHandler = (event) => {
    alert('Consulta agendada')
  }

  render() {
    return (
      <main>
        <div class='formAgendarHolder'>
          <div class='formAgendar'>
            <h1>Consulta</h1>
            <input
              type='text'
              placeholder='CPF'
              class='nameInput'
              value={this.state.cpf}
              onChange={this.cpfHandler}
            />
            <input
              type='text'
              placeholder='Nome do animal'
              class='nameInput'
              value={this.state.animalName}
              onChange={this.animalNameHandler}
            />
            <div style={{ width: '100%', textAlign: 'left' }}>
              <input
                type='date'
                class='timeInput'
                onChange={this.dateHandler}
              />
              <input
                type='time'
                class='timeInput'
                onChange={this.timeHandler}
              />
            </div>
            <br />
            <h3>Custo: R$ 45,00</h3>
            <button type='submit' onClick={this.agendarHandler}>
              Agendar
            </button>
          </div>
        </div>
      </main>
    )
  }
}

export default AppointmentBookingScreen
