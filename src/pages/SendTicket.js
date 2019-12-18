import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { GetUserData } from '../functions/JWT';
import { InsertNewTicket } from '../functions/Database';

class SendTicket extends Component {
    constructor(props, context){
        super(props, context);

        this.HandleTicketForm = this.HandleTicketForm.bind(this);

        this.state = {

        }
    }

    HandleTicketForm(event) {
        event.preventDefault();

        const et = event.target;

        GetUserData()
        .then( res => {
            InsertNewTicket( res.id_cond, res.id, et.formGridSubject.value, et.formGridMessage.value )
            .then( res => {
                console.log( res );
                if (res.count === 0) {
                    this.AlertsHandler.generate('success', 'Ticket enviado', 'Se envió el ticket al equipo del comité.');
                }else{
                    this.AlertsHandler.generate('danger', 'Ticket no enviado', '¡Ocurrió un error! Intenta más tarde.');
                }
            })
        })
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
                                <Form.Group as={Col} controlId="formGridSubject">
                                    <Form.Label>Asunto</Form.Label>
                                    <Form.Control type="text" placeholder="(e.g.: Consulta sobre agua)" />
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
