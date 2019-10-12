import React, { Component } from 'react';
import { Card, Form, Col, Button, Tab, Tabs } from 'react-bootstrap';

class NeighborLoginForm extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Form onSubmit={ this.props.onSubmit } id="neighborLoginForm">
                    <h4>Iniciar sesión: Residentes </h4>
                    <hr />

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Ingresa código de condominio</Form.Label>
                            <Form.Control type="text" placeholder="ARQSM" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPass">
                            <Form.Label>Ingresa número de dpto.</Form.Label>
                            <Form.Control type="number" placeholder="2401" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPass">
                            <Form.Label>Ingresa contraseña de dpto.</Form.Label>
                            <Form.Control type="password" placeholder="********" />
                        </Form.Group>
                    </Form.Row>

                    <Button form="neighborLoginForm" type="submit">
                        Iniciar sesión
                    </Button>
                </Form>
            </div>
        );
    }
}
export default NeighborLoginForm;
