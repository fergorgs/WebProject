import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import StockPanel from './StockPanel'
  import StockItem from './StockItem'
  import placeHolder from './images/racaogato.jpeg'




class StockScreen extends React.Component {

    fetchItemsFromServer(){

                //type 1 = racaoGato
                //type 2 = racaoCao 
                //type 3 = areiaGato
                //type 4 = petiscos
        return [{imgSrc: placeHolder, type: 1, name: "Ração de Gato Persa" , quantity: '47', id: '1564'},
                {imgSrc: placeHolder, type: 3, name: "Areia Felina", quantity: '62', id: '2658'},
                {imgSrc: placeHolder, type: 1, name: "Ração de Gato", quantity: '51', id: '7895'},
                {imgSrc: placeHolder, type: 3, name: "Areia do Saara", quantity: '63', id: '8632'},
                {imgSrc: placeHolder, type: 3, name: "Areia sem Coceira", quantity: '12', id: '9632'},
                {imgSrc: placeHolder, type: 2, name: "Ração Cães Pequenos", quantity: '45', id: '2565'},
                {imgSrc: placeHolder, type: 1, name: "Ração para Gatos", quantity: '85', id: '4521'},
                {imgSrc: placeHolder, type: 2, name: "Ração do Cão Forte", quantity: '51', id: '7852'},
                {imgSrc: placeHolder, type: 4, name: "Petisquinhos do vovó", quantity: '74', id: '3214'},]
    }

    render() {

        return (
            <StockPanel itemsData={this.fetchItemsFromServer()}/>
        );
    }
}

export default StockScreen;