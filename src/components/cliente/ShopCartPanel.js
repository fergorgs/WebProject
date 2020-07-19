import React from 'react'
import '../style.css'


class ShopCartPanel extends React.Component {
  render() {
    return (
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div id='boxCart'>
          <h1>Meu carrinho</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ padding: 2 + 'em' }}>{this.props.items}</div>
            <div id='totalCart'>
              <h3>Total : R$ {Number(this.props.totalCost).toFixed(2)}</h3>
              <button onClick={this.props.buyHandler}> Comprar </button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default ShopCartPanel
