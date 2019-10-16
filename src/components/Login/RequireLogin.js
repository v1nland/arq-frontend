import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

import { Clean, FormatRUT } from '../../functions/RUT'
import { CreateAndStoreToken, VerifyToken, GetSecretKey } from '../../functions/JWT'
import { FetchCondominios } from '../../functions/Database'

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
            IsTokenValid: false
        }
    }

    componentDidMount(){
        // console.log( FetchCondominios('2') );
        FetchCondominios('').then(res => console.log(res));
    }

    HandleUserLoginForm(event){
        event.preventDefault();

        if (FormatRUT(event.target[0].value) === "19.932.690-2" && event.target[1].value === "123") {
            this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');

            //generate and save token on sessionStorage
            CreateAndStoreToken( { user: FormatRUT(event.target[0].value), level: 'admin' }, GetSecretKey() )
            this.setState({ IsTokenValid: true })
        }else{
            this.setState({ IsTokenValid: false })
            this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');
        }
    }

    HandleNeighborLoginForm(event){
        event.preventDefault();

        if (event.target[0].value === "ARQSM" && event.target[1].value === "2401" && event.target[2].value === "123") {
            this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');

            //generate and save token on sessionStorage
            CreateAndStoreToken( { condCode: event.target[0].value, userDpto: event.target[1].value, level: 'user' }, GetSecretKey() )
            this.setState({ IsTokenValid: true })
        }else{
            this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');
            this.setState({ IsTokenValid: false })
        }
    }

    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />

                {
                    VerifyToken( sessionStorage.getItem("token"), GetSecretKey() ) || this.state.IsTokenValid ?
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
