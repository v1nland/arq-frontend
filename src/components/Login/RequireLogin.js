import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

import { Clean, FormatRUT } from '../../functions/RUT'

// Utility components
import CenteredSpinner from '../Utility/CenteredSpinner';
import PageTitle from '../Utility/PageTitle';
import AlertsHandler from '../Utility/AlertsHandler';
import Overlay from '../Utility/Overlay';
import LoginForm from './LoginForm';

class RequireLogin extends Component{
    constructor(props, context){
        super(props, context);

        this.HandleUserLoginForm = this.HandleUserLoginForm.bind(this);
        this.HandleNeighborLoginForm = this.HandleNeighborLoginForm.bind(this);

        this.state = {
            IsLoggedIn: false
        }
    }

    HandleUserLoginForm(event){
        event.preventDefault();

        if (FormatRUT(event.target[0].value) === "19.932.690-2" && event.target[1].value === "123") {
            console.log("Logged in");
            this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');

            sessionStorage.setItem('IsLoggedIn', true);
            sessionStorage.setItem('Level', 'admin');
            this.setState({ IsLoggedIn: true })
        }else{
            console.log("Failed to login");
            this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');

            sessionStorage.setItem('IsLoggedIn', false);
            this.setState({ IsLoggedIn: false })
        }
    }

    HandleNeighborLoginForm(event){
        event.preventDefault();

        if (event.target[0].value === "ARQSM" && event.target[1].value === "2401" && event.target[2].value === "123") {
            console.log("Logged in");
            this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');

            sessionStorage.setItem('IsLoggedIn', true);
            sessionStorage.setItem('Level', 'user');
            this.setState({ IsLoggedIn: true })
        }else{
            console.log("Failed to login");
            this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');

            sessionStorage.setItem('IsLoggedIn', false);
            this.setState({ IsLoggedIn: false })
        }
    }

    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />

                {
                    sessionStorage.getItem('IsLoggedIn') === 'true' ?
                    this.props.appComponent
                    :
                    <Overlay
                        content=<LoginForm
                            onSubmitUserForm={this.HandleUserLoginForm}
                            onSubmitNeighborForm={this.HandleNeighborLoginForm}
                        />
                    />
                }
            </div>
        );
    }
}
export default RequireLogin;
