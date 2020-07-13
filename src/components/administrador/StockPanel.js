import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import StockItem from './StockItem'


class StockPanel extends React.Component {

    componentWillMount(){
        this.setState({ editMode: false,
                        racaoGato: true,
                        racaoCao: true,
                        areiaGato: true,
                        petiscos: true
                      })
    }

    racaoGatoHandler = () => {
        this.setState({racaoGato: !this.state.racaoGato})
    }
    racaoCaoHandler = () => {
        this.setState({racaoCao: !this.state.racaoCao})
    }
    areiaGatoHandler = () => {
        this.setState({areiaGato: !this.state.areiaGato})
    }
    petiscosHandler = () => {
        this.setState({petiscos: !this.state.petiscos})
    }

    editModeHandler = () => {
        this.setState({editMode: !this.state.editMode})
    }
    deleteProductHandler = (id) => {
        //deletes product from BD
        alert('Produto com id \"' + id + '\" deletado do banco de dados')
    }
    changeProductHandler = (id, quantity) => {
        //updates stock levels on BD
        alert('Novo nível de estoque: ' + quantity + ' para produto com id \"' + id + '\"')
    }

    render() {

        const items = this.props.itemsData.map((item) => {

                //type 1 = racaoGato
                //type 2 = racaoCao 
                //type 3 = areiaGato
                //type 4 = petiscos
            if( (item.type == 1 && this.state.racaoGato) ||
                (item.type == 2 && this.state.racaoCao)  || 
                (item.type == 3 && this.state.areiaGato) || 
                (item.type == 4 && this.state.petiscos))
                return <StockItem 
                            editMode={this.state.editMode} 
                            imgSrc={item.imgSrc} 
                            name={item.name} 
                            quantity={item.quantity} 
                            id={item.id}
                            deleteProductHandler={this.deleteProductHandler}
                            changeProductHandler={this.changeProductHandler}
                        />            
        })

        return (
            <main>
                <div id="displayPanelHolder">
                    <h2>
                        Estoques
                        <span class="estoque">        
                        <button type="submit" onClick={this.editModeHandler}>Editar</button>
                        </span>
                    </h2>
                        
                    <span id="filtros">
                        <p>Filtrar:</p>
                        <input 
                            type="checkbox" 
                            id="gatos" 
                            name="Gatos" 
                            checked={this.state.racaoGato}
                            onChange={this.racaoGatoHandler} />
                        <label>Ração de Gato</label>
                        <input 
                            type="checkbox" 
                            id="cachorros" 
                            name="Cachorros" 
                            checked={this.state.racaoCao}
                            onChange={this.racaoCaoHandler} />
                        <label>Ração de cachorro</label>
                        <input 
                            type="checkbox" 
                            id="adocao" 
                            name="Adocao" 
                            checked={this.state.areiaGato}
                            onChange={this.areiaGatoHandler} />
                        <label>Areia de gato</label>
                        <input 
                            type="checkbox" 
                            id="venda" 
                            name="Venda" 
                            checked={this.state.petiscos}
                            onChange={this.petiscosHandler} />
                        <label>Petiscos</label>
                    </span>

                    <div class="displayPanel">
                        {items}
                    </div>
                </div>
            </main>
        );
    }
}

export default StockPanel;