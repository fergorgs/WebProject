import React from 'react'
import '../style.css'

class ProducSlider extends React.Component {
  render() {
    return (
      <div class='productSliderHolder'>
        <h1>{this.props.name}</h1>
        <class class='container'>
          <img
            src={require('./images/arrow.svg')}
            class='leftArrow'
            id='left1'
          />
          <img
            src={require('./images/arrow.svg')}
            class='rightArrow'
            id='right1'
          />
          <div class='productSlider righter lefter' id='carousel1'>
            {this.props.items}
          </div>
        </class>
      </div>
    )
  }
}

export default ProducSlider
