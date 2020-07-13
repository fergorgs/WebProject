import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


class PetCard extends React.Component {

    renderRemoveButton = () => {

        if(this.props.removeMode)
            return <div onClick={() => this.props.removePetHandler(this.props.id)}>
                        <h2 style={{textAlign: 'right', paddingLeft: '1em', cursor: 'pointer'}}>
                            <strong>X</strong>
                        </h2>
                    </div>
    }

    render() {

        return (
            <div class="petCard">
                <img class="image" src={this.props.imgSrc}/>
                <div>
                    {this.renderRemoveButton()}
                    <p class="petName">{this.props.name}</p>
                    <div class="petInfoHolder">
                        <div style={{display: 'flex'}}>
                            <div class="petInfoLabels">
                                <p>ID</p>
                                <p>Raça</p>
                            </div>
                            <div class="petInfoContent">
                                <p>{this.props.id}</p>
                                <p>{this.props.race}</p>
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div class="petInfoLabels">
                                <p>Sexo</p>
                                <p>Idade</p>
                            </div>
                            <div class="petInfoContent">
                                <p>{this.props.sex}</p>
                                <p>{this.props.age + ' anos'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PetCard;