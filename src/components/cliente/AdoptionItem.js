import React from "react";
import "../style.css";

class AdoptionItem extends React.Component {
  render() {
    return (
      <div class="displayCard">
        <img
          alt={this.props.name}
          src={this.props.imgSrc}
          style={{ width: "100%", height: "15em" }}
        />
        <p class="displayName">{this.props.name}</p>
        <div class="raceAndAge">
          <p class="raceLabel">Espécie: </p>
          <p class="raceContent">{this.props.specie}</p>
          <p class="raceLabel">Raça:</p>
          <p class="raceContent">{this.props.race}</p>
          <p class="ageLabel">Idade:</p>
          <p class="ageContent">{this.props.age + " anos"}</p>
          {this.props.type === "Venda" ? (
            <>
              <p class="raceLabel">Preço:</p>
              <p class="raceContent">
                R$ {Number(this.props.price).toFixed(2)}
              </p>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AdoptionItem;
