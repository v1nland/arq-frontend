import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

class SendTicket extends Component {
    constructor(props, context){
        super(props, context);

        this.HandleTicketForm = this.HandleTicketForm.bind(this);

        this.state = {

        }
    }

    HandleTicketForm(event) {
        event.preventDefault();

        this.AlertsHandler.generate('success', 'Ticket Enviado', 'Se envió el ticket al equipo del comité.');

        console.log(event.target.formGridEmail.value);
        console.log(event.target.formGridDpto.value);
        console.log(event.target.formGridMessage.value);
    }

    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Tickets" />

                <Card>
                    <Card.Header>Enviar ticket al comité</Card.Header>

                    <Card.Body>
                        <Form onSubmit={this.HandleTicketForm} id="ticketForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu correo" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDpto">
                                    <Form.Label>Número dpto.</Form.Label>
                                    <Form.Control type="number" min="1000" max="2600" placeholder="2005" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDate">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="date" placeholder="dd/MM/yy" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridMessage">
                                    <Form.Label>Mensaje</Form.Label>
                                    <Form.Control as="textarea" rows="6" placeholder="Escribe aquí tu mensaje."/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Card.Body>

                    <Card.Footer className="text-center">
                        <Button form="ticketForm" type="submit">
                            Enviar ticket
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
export default SendTicket;
