import React from 'react'
import '../style.css'

class ProductItem extends React.Component {
  render() {
    return (
      <div class='productItemHolder'>
        <div class='productItem'>
          <img src={this.props.imgSrc} />
          <div
            style={{
              display: 'flex',
              marginTop: 1 + 'em',
              fontSize: 1.2 + 'em',
            }}
          >
            <div style={{ width: '50%', textAlign: 'left' }}>
              <p>{this.props.name}</p>
            </div>
            <div style={{ width: '50%', textAlign: 'rigth', color: 'red' }}>
              <p>{'R$ ' + this.props.price}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductItem
