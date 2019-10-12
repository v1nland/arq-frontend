import React, { Component } from 'react';
import { Card, Form, Col, Button, Tab, Tabs } from 'react-bootstrap';

class UserLoginForm extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {

        }
    }

    render(){
        return(
            <Form onSubmit={ this.props.onSubmit } id="userLoginForm">
                <h4>Iniciar sesión: Administradores </h4>
                <hr />

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridRutAdmin">
                        <Form.Label>RUT administrador</Form.Label>
                        <Form.Control type="text" placeholder="11.111.111-1" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassAdmin">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="******" />
                    </Form.Group>
                </Form.Row>

                <Button form="userLoginForm" type="submit">
                    Iniciar sesión
                </Button>
            </Form>
        );
    }
}
export default UserLoginForm;
