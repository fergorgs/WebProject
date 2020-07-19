import React from 'react';
import '../style.css'
import dogPlaceHolder from './images/dog.jpg'
import PetDetailsCard from './PetDetailsCard'


class PetDetailsScreen extends React.Component {

    fetchPetDetailsFromServer(id){

        //fetch fetch fetch

        return {id: id,
                type: 'sell',
                race: 'Beagle',
                imgSrc: dogPlaceHolder,
                age: '2',
                price: '24,90',
                sex: 'macho',
                }
    }

    render() {

        const petInfo = this.fetchPetDetailsFromServer(this.props.match.params.id)

        return (
            <div>
                <main>
                    <PetDetailsCard 
                        imgSrc={petInfo.imgSrc}
                        type={petInfo.type}
                        price={petInfo.price}
                        age={petInfo.age}
                        race={petInfo.race}
                        sex={petInfo.sex}
                    />
                </main>
            </div>
        );
    }
}

export default PetDetailsScreen;