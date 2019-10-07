import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../Utility/CenteredSpinner';
import PageTitle from '../Utility/PageTitle';
import AlertsHandler from '../Utility/AlertsHandler';

class LoginForm extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            ShowLoginScreen: true
        }
    }

    render(){
        return(
            <div className="login-form">
                <Card className="text-center" bg="info" text="white">
                    <Card.Header><b>Debes iniciar sesión antes de visitar el sitio</b></Card.Header>

                    <Card.Body>
                        <Form onSubmit={ this.props.onSubmit } id="loginForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Número dpto.</Form.Label>
                                    <Form.Control type="number" placeholder="2401" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPass">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="******" />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Card.Body>

                    <Card.Footer className="text-center">
                        <Button form="loginForm" type="submit">
                            Iniciar sesión
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
export default LoginForm;
