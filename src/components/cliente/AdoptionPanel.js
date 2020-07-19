import React from 'react';
import '../style.css'


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