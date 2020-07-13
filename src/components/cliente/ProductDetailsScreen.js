import React from 'react';
import '../style.css'
import range from 'lodash/range';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
import placeHolder from './images/golden.jpg'
import placeHolder2 from './images/racaogato.jpeg'
import ProductCard from './ProductCard'


class ProductDetailsScreen extends React.Component {

    fetchProductDetailsFromServer(id){

        //fetch fetch fetch

        return {id: id,
                name: 'Ração de Gato',
                imgSrc: placeHolder,
                price: '24,90',
                description: 'Ração de gato para pelos macios e brilhantes'
                }
    }

    render() {

        const prodInfo = this.fetchProductDetailsFromServer(this.props.match.params.id)

        return (
            <div>
                <main>
                    <ProductCard 
                        name={prodInfo.name}
                        imgSrc={prodInfo.imgSrc}
                        description={prodInfo.description}
                        price={prodInfo.price}
                    />
                </main>
            </div>
        );
    }
}

export default ProductDetailsScreen;