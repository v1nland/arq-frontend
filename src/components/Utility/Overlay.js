import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../Utility/CenteredSpinner';
import PageTitle from '../Utility/PageTitle';
import AlertsHandler from '../Utility/AlertsHandler';

class Overlay extends Component{
    render(){
        return(
            <div className="overlay">
                { this.props.content }
            </div>
        );
    }
}
export default Overlay;
