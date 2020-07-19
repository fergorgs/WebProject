import React from 'react'
import '../style.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import StockItem from './StockItem'

class StockPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      racaoGato: true,
      racaoCao: true,
      areiaGato: true,
      petiscos: true,
      items: [],
    }
  }

  componentDidMount() {
    if (this.props.itemsData.length === 0) {
      this.setState({ items: 'Nenhum produto registrado!' })
    } else {
      const items = this.props.itemsData.map((item) => {
        //type 1 = racaoGato
        //type 2 = racaoCao
        //type 3 = areiaGato
        //type 4 = petiscos
        if (
          (item.type == 1 && this.state.racaoGato) ||
          (item.type == 2 && this.state.racaoCao) ||
          (item.type == 3 && this.state.areiaGato) ||
          (item.type == 4 && this.state.petiscos)
        )
          return (
            <StockItem
              editMode={this.state.editMode}
              imgSrc={`http://localhost:5000/${item.imgSrc}`}
              name={item.name}
              quantity={item.quantity}
              id={item.id}
              deleteProductHandler={this.deleteProductHandler}
              changeProductHandler={this.changeProductHandler}
            />
          )
      })
      this.setState({ items })
    }
  }

  racaoGatoHandler = () => {
    this.setState({ racaoGato: !this.state.racaoGato })
  }
  racaoCaoHandler = () => {
    this.setState({ racaoCao: !this.state.racaoCao })
  }
  areiaGatoHandler = () => {
    this.setState({ areiaGato: !this.state.areiaGato })
  }
  petiscosHandler = () => {
    this.setState({ petiscos: !this.state.petiscos })
  }

  editModeHandler = () => {
    this.setState({ editMode: !this.state.editMode })
  }
  deleteProductHandler = (id) => {
    fetch('/product/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(async (res) => {
      if (res.ok) {
        alert('Produto removido com sucesso!')
      } else if (res.status === 400) {
        const error = await res.json()
        alert(error.error)
      }
    })
  }
  changeProductHandler = (id, quantity) => {
    fetch('/product/updateStock', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, quantity }),
    }).then(async (res) => {
      if (res.status === 400) {
        const error = await res.json()
        alert(error.error)
      }
    })
  }

  render() {
    return (
      <main>
        <div id='displayPanelHolder'>
          <h2>
            Estoques
            <span class='estoque'>
              <button type='submit' onClick={this.editModeHandler}>
                Editar
              </button>
            </span>
          </h2>

          <span id='filtros'>
            <p>Filtrar:</p>
            <input
              type='checkbox'
              id='gatos'
              name='Gatos'
              checked={this.state.racaoGato}
              onChange={this.racaoGatoHandler}
            />
            <label>Ração de Gato</label>
            <input
              type='checkbox'
              id='cachorros'
              name='Cachorros'
              checked={this.state.racaoCao}
              onChange={this.racaoCaoHandler}
            />
            <label>Ração de cachorro</label>
            <input
              type='checkbox'
              id='adocao'
              name='Adocao'
              checked={this.state.areiaGato}
              onChange={this.areiaGatoHandler}
            />
            <label>Areia de gato</label>
            <input
              type='checkbox'
              id='venda'
              name='Venda'
              checked={this.state.petiscos}
              onChange={this.petiscosHandler}
            />
            <label>Petiscos</label>
          </span>

          <div class='displayPanel'>{this.state.items}</div>
        </div>
      </main>
    )
  }
}

export default StockPanel
