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

        this.HandleUserLoginForm = this.HandleUserLoginForm.bind(this);
        this.HandleNeighborLoginForm = this.HandleNeighborLoginForm.bind(this);

        this.state = {
            IsLoggedIn: false
        }
    }

    Clean (rut) {
        return typeof rut === 'string'
        ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
        : ''
    }

    FormatRUT (rut) {
        rut = this.Clean(rut)
        var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)

        for (var i = 4; i < rut.length; i += 3)
            result = rut.slice(-3 - i, -i) + '.' + result

        return result
    }

    HandleUserLoginForm(event){
        event.preventDefault();

        if (this.FormatRUT(event.target[0].value) === "19.932.690-2" && event.target[1].value === "123") {
            console.log("Logged in");
            this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');

            this.setState({ IsLoggedIn: true })
        }else{
            console.log("Failed to login");
            this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');

            this.setState({ IsLoggedIn: false })
        }
    }

    HandleNeighborLoginForm(event){
        event.preventDefault();

        if (event.target[0].value === "ARQSM" && event.target[1].value === "2401" && event.target[2].value === "123") {
            console.log("Logged in");
            this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');

            this.setState({ IsLoggedIn: true })
        }else{
            console.log("Failed to login");
            this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');

            this.setState({ IsLoggedIn: false })
        }
    }

    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />

                {
                    this.state.IsLoggedIn ?
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
