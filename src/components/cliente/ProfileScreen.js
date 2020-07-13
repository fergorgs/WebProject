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
  import petPlaceHolder from './images/dog2.jpeg'
import PetCard from './PetCard';



class AdoptionScreen extends React.Component {

    fetchProfileInfo(){

        //fetch fetch fetch

        return {
                imgSrc: profilePlaceHolder,
                id: 10801180,
                name: 'Laura Genari Alves de Jesus',
                address: 'Rua dos Bobos, 0',
                phone: '16 99999-8888',
                email: 'lau.genari@gmail.com',
                cpf: '439.973.222-98',
                }
    }

    fetchPetsInfo(clientId){

        //fetch fetch fetch

        return [{imgSrc: petPlaceHolder, name: "Gilberto", race: "Beagle", age: "6", id: '155364',},
                {imgSrc: petPlaceHolder, name: "Antonio", race: "Beagle", age: "6", id: '159864',},
                {imgSrc: petPlaceHolder, name: "Mario", race: "Beagle", age: "6", id: '155316',},
                {imgSrc: petPlaceHolder, name: "Antonio", race: "Beagle", age: "6", id: '184364',},
                {imgSrc: petPlaceHolder, name: "Gustavo", race: "Beagle", age: "6", id: '196364',},
                {imgSrc: petPlaceHolder, name: "Gabriel", race: "Beagle", age: "6", id: '158524',},
                {imgSrc: petPlaceHolder, name: "Leandro", race: "Beagle", age: "6", id: '178544',},
                {imgSrc: petPlaceHolder, name: "José", race: "Beagle", age: "6", id: '164583',},]

    }

    removePetHandler = (id) => {
        alert('removed pet id: ' + id)
        this.setState({})
    }

    render() {

        const profileInfo = this.fetchProfileInfo()

        return (
            <main id="profileHolder">
                <div class="perfilHolder" style={{display: "flex", alignItems: "center" }}>
                    <ProfileCard
                        imgSrc={profileInfo.imgSrc}
                        id={profileInfo.id}
                        name={profileInfo.name}
                        address={profileInfo.address}
                        phone={profileInfo.phone}
                        email={profileInfo.email}
                        cpf={profileInfo.cpf}
                    />
                    <OwnedPetsPanel 
                        itemsData={this.fetchPetsInfo(profileInfo.id)} 
                        removePetHandler={this.removePetHandler}
                        match={this.props.match}
                    />
                </div>
            </main>
        );
    }
}

export default AdoptionScreen;