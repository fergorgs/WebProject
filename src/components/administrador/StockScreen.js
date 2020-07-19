import React from 'react'
import '../style.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import StockPanel from './StockPanel'
import StockItem from './StockItem'
import placeHolder from './images/racaogato.jpeg'

class StockScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      items:[]
    }
  }

  typeToNumber(type){
    let number
    switch(type){
      case 'Ração Gato':
        number = 1
        break;
      case 'Ração Cão':
        number = 2
        break
      case 'Areia Gato':
        number = 3
        break
      case 'Petiscos':
        number = 4
        break
    }
    return number
  }
  
  fetchItemsFromServer() {
    fetch('/product/get', {
        method:'GET'
    }).then(async res=>{
        if(res.ok){
            const result = await res.json()
            const items = result.products.map(product=>{
                return {
                    imgSrc:product.photo,
                    type:this.typeToNumber(product.type),
                    name:product.name,
                    quantity:product.quantity,
                    id:product._id
                }
            })
            this.setState({items})
        }else {
            alert('Erro ao resgatar produtos')
        }
    })
  }

  componentDidMount(){
    this.fetchItemsFromServer()
  }

  render() {
    return <StockPanel itemsData={this.state.items} />
  }
}

export default StockScreen
