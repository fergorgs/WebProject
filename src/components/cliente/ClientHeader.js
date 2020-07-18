import React from 'react'
import '../style.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

class ClientHeader extends React.Component {
  render() {
    return (
      <header>
        <div class='title title_small'>
          <h1>Petz</h1>
        </div>
        <div class='menu menuClient'>
          <ul>
            <li>
              <Link to={`${this.props.match.path}/agendamentos`}>Agendamentos</Link>
            </li>
            <li>
              <Link to={`${this.props.match.path}/produtos`}>Produtos</Link>
            </li>
            <li>
              <Link to={`${this.props.match.path}/adocao`}>
                Compre/Adote pets
              </Link>
            </li>
            <li>
              <Link to={`${this.props.match.path}/perfil`}>Meu perfil</Link>
            </li>
            <li>
              <Link to={`${this.props.match.path}/carrinho`}>Meu carrinho</Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default ClientHeader
