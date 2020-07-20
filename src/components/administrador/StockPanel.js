import React, { useState, useEffect } from 'react'
import '../style.css'
import StockItem from './StockItem'

export default function StockPanel(props) {
  const [items, setItems] = useState([])
  const [editMode, setEditMode] = useState(false)

  const [racaoGato, setRacaoGato] = useState(true)
  const [racaoCao, setRacaoCao] = useState(true)
  const [areiaGato, setAreiaGato] = useState(true)
  const [petiscos, setPetiscos] = useState(true)

  useEffect(() => {
    const items = props.itemsData.map((item) => {
      //type 1 = racaoGato
      //type 2 = racaoCao
      //type 3 = areiaGato
      //type 4 = petiscos
      if (
        (item.type == 1 && racaoGato) ||
        (item.type == 2 && racaoCao) ||
        (item.type == 3 && areiaGato) ||
        (item.type == 4 && petiscos)
      )
        return (
          <StockItem
            editMode={editMode}
            imgSrc={`http://localhost:5000/${item.imgSrc}`}
            name={item.name}
            price={item.price}
            sale={item.sale}
            quantity={item.quantity}
            id={item.id}
            deleteProductHandler={deleteProductHandler}
            changeProductHandler={changeProductHandler}
          />
        )
    })
    setItems(items)
  }, [props.itemsData, racaoGato, racaoCao, petiscos, areiaGato, editMode])

  const deleteProductHandler = (id) => {
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
  const changeProductHandler = (id, quantity, price, sale) => {
    fetch('/product/updateStock', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, quantity, price, sale }),
    }).then(async (res) => {
      if (res.status === 400) {
        const error = await res.json()
        alert(error.error)
      }
    })
  }

  return (
    <main>
      <div id='displayPanelHolder'>
        <h2>
          Estoques
          <span class='estoque'>
            <button
              type='submit'
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              Editar
            </button>
          </span>
        </h2>

        <span id='filtros'>
          Filtrar:
          <input
            type='checkbox'
            id='gatos'
            name='Gatos'
            checked={racaoGato}
            onChange={() => {
              setRacaoGato(!racaoGato)
            }}
          />
          <label>Ração de Gato</label>
          <input
            type='checkbox'
            id='cachorros'
            name='Cachorros'
            checked={racaoCao}
            onChange={() => {
              setRacaoCao(!racaoCao)
            }}
          />
          <label>Ração de cachorro</label>
          <input
            type='checkbox'
            id='adocao'
            name='Adocao'
            checked={areiaGato}
            onChange={() => {
              setAreiaGato(!areiaGato)
            }}
          />
          <label>Areia de gato</label>
          <input
            type='checkbox'
            id='venda'
            name='Venda'
            checked={petiscos}
            onChange={() => {
              setPetiscos(!petiscos)
            }}
          />
          <label>Petiscos</label>
        </span>

        <div class='displayPanel'>{items}</div>
      </div>
    </main>
  )
}
