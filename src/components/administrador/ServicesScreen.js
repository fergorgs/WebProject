import React from 'react'
import '../style.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import Calendar from 'react-calendar'
import ServiceTable from './ServiceTable'

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

class ServicesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      formattedDate: '',
      services: [],
    }
  }

  componentWillMount() {
    const newDate = dataFormatada(this.state.date)
    this.setState({ formattedDate: newDate })
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
  render() {
    return (
      <main id='mainAdmin'>
        <Calendar
          className='calendar'
          tileClassName='calendarCell'
          onChange={this.onChange}
          value={this.state.date}
          showNavigation={true}
        />
        <ServiceTable
          formattedDate={this.state.formattedDate}
          services={this.state.services}
        />
      </main>
    )
  }
}

export default ServicesScreen
