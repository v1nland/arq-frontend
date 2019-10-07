import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../Utility/CenteredSpinner';
import PageTitle from '../Utility/PageTitle';
import AlertsHandler from '../Utility/AlertsHandler';
import Overlay from '../Utility/Overlay';
import LoginForm from './LoginForm';

class RequireLogin extends Component{
    constructor(props, context){
        super(props, context);

        this.HandleLoginForm = this.HandleLoginForm.bind(this);

        this.state = {
            ShowLoginScreen: true
        }
    }

    HandleLoginForm(event){
        event.preventDefault();

        if (event.target[0].value === "2401" && event.target[1].value === "123") {
            console.log("Logged in");
            this.setState({ ShowLoginScreen: false })
            this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');
        }else{
            console.log("Failed to login");
            this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');
        }
    }

    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />

                {
                    this.state.ShowLoginScreen ?
                    <Overlay
                        content=<LoginForm onSubmit={this.HandleLoginForm} />
                    />
                    :
                    null
                }
            </div>
        );
    }
}
export default RequireLogin;
