import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

import { Clean, FormatRUT } from '../../functions/RUT'
import { CreateAndStoreToken, VerifyToken } from '../../functions/JWT'
import { FetchCondominios, FetchUserLogin, FetchDptoLogin } from '../../functions/Database'

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
        // FetchCondominios('').then( res => console.log(res) ); // Realiza console.log( FetchCondominios('2') );
    }

    HandleUserLoginForm(event){
        event.preventDefault();
        const et = event.target;

        FetchUserLogin( FormatRUT(et[0].value), et[1].value )
        .then( res => {
            if(res.count === 1){
                // Login succeed
                this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');

                CreateAndStoreToken( { user: et[0].value, password: et[1].value, level: 'admin' } )
                this.setState({ IsTokenValid: true })
            }else{
                // Login failed
                this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');
            }
        })
    }

    HandleNeighborLoginForm(event){
        event.preventDefault();
        const et = event.target;

        FetchDptoLogin( et[0].value, et[1].value, et[2].value )
        .then( res => {
            if(res.count === 1){
                // Login succeed
                this.AlertsHandler.generate('success', '¡Genial!', 'Iniciaste sesión exitosamente.');

                CreateAndStoreToken( { condCode: et[0].value, user: et[1].value, password: et[2].value, level: 'user' } )
                this.setState({ IsTokenValid: true })
            }else{
                // Login failed
                this.AlertsHandler.generate('danger', '¡Error!', 'Credenciales incorrectas.');
            }
        })
    }

    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />

                {
                    VerifyToken( sessionStorage.getItem("token") ) || this.state.IsTokenValid ?
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
