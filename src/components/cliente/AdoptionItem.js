import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


class AdoptionItem extends React.Component {

    render() {
        return (
            <div class="displayCard">
                <img src={this.props.imgSrc} />
                <p class="displayName">{this.props.name}</p>
                <div class="raceAndAge">
                <p class="raceLabel">Raça:</p>
                <p class="raceContent">{this.props.race}</p>
                <p class="ageLabel">Idade:</p>
                <p class="ageContent">{this.props.age + ' anos'}</p>
                </div>
            </div>
        );
    }
}

export default AdoptionItem;