import React from 'react';
import '../style.css'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


class AdoptionPanel extends React.Component {

    render() {
        return (
            <div class="displayPanel">
                {this.props.items}
            </div>
        );
    }
}

export default AdoptionPanel;