import React from 'react'
import '../style.css'
import ReactInputMask from 'react-input-mask'

class ShopCartPanel extends React.Component {
  render() {
    return (
      <div>
        <div id='boxCart'>
          <h1>Meu carrinho</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
            }}
          >
            <div style={{ padding: 2 + 'em' }}>
              {this.props.items.length > 0
                ? this.props.items
                : 'Seu carrinho está vazio!'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShopCartPanel
