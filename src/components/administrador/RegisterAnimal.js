import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default function RegisterAnimal(props) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')
  const [gender, setGender] = useState('')
  const [file, setFile] = useState(null)
  const [redirect, setRedirect] = useState('/admin/registro/animais')
  const [adoptionMethod, setAdoptionMethod] = useState('Adoção')
  const [price, setPrice] = useState(0.0)
  const [specie, setSpecie] = useState('')

  
  const handleClick = () => {
    const data = { name, age, breed, gender, adoptionMethod, price, specie }
    fetch('/animal/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        const id = await res.json()
        
        handleUpload(id.id)
      } else {
        const err = await res.json()
        alert(err.error)
      }
    })
  }

  const handleUpload = (id) => {
    const fd = new FormData()
    fd.set('id', id)
    fd.append('image', file)
    axios
      .post('http://localhost:5000/upload/animal', fd, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert('Animal registrado com sucesso!')

          setRedirect('/admin')
        } else {
          alert('Falha no upload de foto!')
        }
      })
  }

  return (
    <main>
      <Redirect to={redirect} />
      <div class='formAgendarHolder'>
        <div class='formAgendar  shadow'>
          <h1>Novo Animal </h1>
          <input
            type='text'
            name='AnimalName'
            placeholder='Nome do do Animal'
            class='nameInput'
            value={name}
            onChange={(ev) => {
              setName(ev.target.value)
            }}
          />
          <input
            type='text'
            name='gender'
            placeholder='Sexo'
            class='nameInput'
            value={gender}
            onChange={(ev) => {
              setGender(ev.target.value)
            }}
          />
          <input
            type='text'
            name='specie'
            placeholder='Espécie'
            class='nameInput'
            value={specie}
            onChange={(ev) => {
              setSpecie(ev.target.value)
            }}
          />
          <input
            type='text'
            placeholder='Raça'
            name='breed'
            class='nameInput'
            value={breed}
            onChange={(ev) => {
              setBreed(ev.target.value)
            }}
          />
          <input
            type='number'
            placeholder='Idade'
            class='nameInput'
            name='age'
            onChange={(ev) => {
              setAge(ev.target.value)
            }}
          />
          <select
            style={{ display: 'flex' }}
            value={adoptionMethod}
            onChange={(ev) => {
              setAdoptionMethod(ev.target.value)
            }}
          >
            <option>Adoção</option>
            <option>Venda</option>
          </select>
          {adoptionMethod == 'Venda' ? (
            <input
              type='number'
              placeholder='Preço'
              class='nameInput'
              name='price'
              onChange={(ev) => {
                setPrice(ev.target.value)
              }}
            />
          ) : null}
          <input
            type='file'
            class='fileInput'
            accept='image/*'
            onChange={(ev) => {
              setFile(ev.target.files[0])
            }}
          />
          <button type='submit' onClick={handleClick}>
            Confirmar
          </button>
        </div>
      </div>
    </main>
  )
}
