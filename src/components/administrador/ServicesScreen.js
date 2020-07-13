import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import Calendar from 'react-calendar';
  




class ServicesScreen extends React.Component {

    componentWillMount(){
        this.setState({date: new Date()})
    }

    onChange = date => this.setState({ date: date })

    render() {

        return (
            <main id="mainAdmin">
                <Calendar
                    className="calendar"
                    tileClassName="calendarCell"
                    onChange={this.onChange}
                    value={this.state.date}
                    showNavigation={true}
                />
                <table class="agenda">
                    <tr>
                    <td width="200px">
                        <h3> 09 de Abril de 2017</h3>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        <img src="../images/mode_edit.png" class="edit"/>
                    </td>
                    </tr>
                    <tr>
                    <td> Horas </td>
                    <td> Serviço </td>
                    <td> Cliente </td>
                    <td> Animal </td>
                    </tr>
                    <tr>
                    <td> 8:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 9:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 10:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 11:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 12:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 13:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 14:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 15:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 16:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                    <tr>
                    <td> 17:00 </td>
                    <td> Banho </td>
                    <td> Jorge </td>
                    <td> gato </td>
                    </tr>
                </table>
                
            </main>
        );
    }
}

export default ServicesScreen;