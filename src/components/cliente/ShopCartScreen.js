import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import ProfileCard from './ProfileCard'
  import OwnedPetsPanel from './OwnedPetsPanel'
  import profilePlaceHolder from './images/coffinGuy.jpg'
  import placeHolder from './images/golden.jpg'
import PetCard from './PetCard';
import ShopCartPanel from './ShopCartPanel';
import CartItem from './CartItem'



class ShopCartScreen extends React.Component {

    fetchItemsFromServer(userId){

        //fetch fetch fetch

        return [{id: 120, imgSrc: placeHolder, name: "Ração do Cão" , price: "63.00"},
                {id: 121, imgSrc: placeHolder, name: "Ração do Gato", price: "73.00"},
                {id: 122, imgSrc: placeHolder, name: "Ração do Rato", price: "83.00"},]

    }

    componentWillMount(){
        this.setState({itemsData: this.fetchItemsFromServer()})
    }

    buyHandler = () => {

        for(let i in this.state.itemsData){
            //finds on stock the product with the equivalent ID
            //and subtracts 1 from the total amount
        }

        alert("Compra concluida!")
    }

    render() {

        let totalCost = 0

        let shops = this.state.itemsData.map((item) => {

            totalCost += Number(item.price)

            return <CartItem
                    id={item.id}
                    imgSrc={placeHolder} 
                    name={item.name}
                    price={item.price}
                    />
        })

        return (
            <ShopCartPanel items={shops} totalCost={totalCost} buyHandler={this.buyHandler}/>
        );
    }
}

export default ShopCartScreen;