import React from 'react'
import '../style.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core'
class ProductRegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: null,
      quantity: null,
      photo: null,
      type: 'Ração Gato',
      newId: '',
      redirect: '/admin/registro/produtos',
      sale: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  photoHandler = (event) => {
    this.setState({ photo: event.target.files[0] })
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  uploadImage() {
    const fd = new FormData()
    fd.set('id', this.state.newId)
    fd.append('image', this.state.photo)
    axios
      .post('http://localhost:5000/upload/product', fd, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert('Produto registrado com sucesso!')

          this.setState({ redirect: '/admin' })
        } else {
          alert('Falha no upload de foto!')
        }
      })
  }

  submitHandler() {
    const data = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      quantity: this.state.quantity,
      type: this.state.type,
      sale:this.state.sale
    }
    fetch('/product/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        const id = await res.json()
        this.setState({ newId: id._id }, () => {
          this.uploadImage()
        })
      } else {
        const err = await res.json()
        alert(err.error)
      }
    })
  }

  render() {
    return (
      <main>
        <Redirect to={this.state.redirect} />
        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <h1>Novo Produto </h1>
            <input
              type='text'
              name='name'
              placeholder='Nome do produto'
              class='nameInput'
              value={this.state.name}
              onChange={this.handleChange}
            />

            <input
              type='text'
              name='description'
              placeholder='Descrição'
              class='nameInput'
              value={this.state.description}
              onChange={this.handleChange}
            />
            <input
              type='number'
              name='price'
              placeholder='Preço'
              class='nameInput'
              value={this.state.price}
              onChange={this.handleChange}
            />
            <input
              type='number'
              name='quantity'
              placeholder='Quantidade'
              class='nameInput'
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <div style={{ display: 'flex' }}>
              <select
                onChange={this.handleChange}
                name='type'
                value={this.state.type}
              >
                <option defaultValue={true} disabled={true}>
                  Tipo
                </option>
                <option>Ração Gato</option>
                <option>Ração Cão</option>
                <option>Areia Gato</option>
                <option>Petiscos</option>
              </select>
            </div>
            <FormGroup row style={{paddingLeft:'2.2em'}}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.sale}
                    value={this.state.sale}
                    onChange={() => {
                      this.setState({ sale: !this.state.sale })
                    }}
                  />
                }
                label='Promoção'
              ></FormControlLabel>
            </FormGroup>
            <input
              type='file'
              accept='image/*'
              class='fileInput'
              onChange={this.photoHandler}
            />
            <button type='submit' onClick={this.submitHandler.bind(this)}>
              Confirmar
            </button>
          </div>
        </div>
      </main>
    )
  }
}

export default ProductRegisterForm
