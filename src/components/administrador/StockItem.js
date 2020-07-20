import React from 'react'
import '../style.css'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'

class StockItem extends React.Component {
  componentWillMount() {
    this.setState({
      quantity: this.props.quantity,
      sale: this.props.sale,
      price: this.props.price,
    })
  }

  changeProductHandler = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value }, () => {
      this.props.changeProductHandler(
        this.props.id,
        this.state.quantity,
        this.state.price,
        this.state.sale
      )
    })
  }

  render() {
    if (this.props.editMode) {
      return (
        <div class='displayCard'>
          <button
            type='submit'
            onClick={() => this.props.deleteProductHandler(this.props.id)}
          >
            Remover
          </button>
          <img alt={this.props.name} src={this.props.imgSrc} />
          <div class='item'>
            <p class='itemLabel'>{this.props.name}</p>
            <p>
              Quantidade:
              <input
                type='number'
                name='quantity'
                value={this.state.quantity}
                onChange={this.changeProductHandler}
              ></input>
            </p>
            <p>
              Preço:
              <input
                type='number'
                name='price'
                value={this.state.price}
                onChange={this.changeProductHandler}
              ></input>
            </p>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name='sale'
                    checked={this.state.sale}
                    value={this.state.sale}
                    onChange={() => {
                      this.setState({ sale: !this.state.sale }, () => {
                        this.props.changeProductHandler(
                          this.props.id,
                          this.state.quantity,
                          this.state.price,
                          this.state.sale
                        )
                      })
                    }}
                  />
                }
                label='Promoção'
              ></FormControlLabel>
            </FormGroup>
          </div>
        </div>
      )
    }

    return (
      <div class='displayCard'>
        <img alt={this.props.name} src={this.props.imgSrc} />
        <div class='item'>
          <p class='itemLabel'>{this.props.name}</p>
          <p>Quantidade: {this.state.quantity} uni.</p>
          <p>Preço: R${this.state.price}</p>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={this.state.sale} disabled={true} />}
              label='Promoção'
            ></FormControlLabel>
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default StockItem
