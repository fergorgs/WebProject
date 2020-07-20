import React from 'react'
import '../style.css'

class PetCard extends React.Component {
  renderRemoveButton = () => {
    if (this.props.removeMode)
      return (
        <div onClick={() => this.props.removePetHandler(this.props.id, this.props.imgSrc)}>
          <h2
            style={{
              textAlign: 'right',
              paddingLeft: '1em',
              cursor: 'pointer',
            }}
          >
            <strong>X</strong>
          </h2>
        </div>
      )
  }

  render() {
    return (
      <div class='petCard'>
        <img class='image' alt={this.props.name} src={`http://localhost:5000/${this.props.imgSrc}`} />
        <div>
          {this.renderRemoveButton()}
          <p class='petName'>{this.props.name}</p>
          <div class='petInfoHolder'>
            <div style={{ display: 'flex' }}>
              <div class='petInfoLabels'>
                <p>ID</p>
                <p style={{ marginTop: '2.3em' }}>Raça</p>
              </div>
              <div class='petInfoContent'>
                <p style={{ display: 'flex', wordBreak: 'break-word' }}>
                  {this.props.id}
                </p>
                <p>{this.props.race}</p>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div class='petInfoLabels'>
                <p>Sexo</p>
                <p style={{ marginTop: '2.3em' }}>Idade</p>
              </div>
              <div class='petInfoContent'>
                <p>{this.props.sex}</p>
                <p style={{ marginTop: '2.3em' }}>{this.props.age + ' anos'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PetCard
