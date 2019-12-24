import React, { Component } from 'react';
import { Form, Accordion, Card, Button, Grid, Row, Col, Tab, Tabs, Modal } from 'react-bootstrap';

// Utility components
import CenteredSpinner from './CenteredSpinner';
import AlertsHandler from './AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import { AnswerTicket } from '../../functions/Database';

class SupportTicket extends Component{
    constructor(props, context){
        super(props, context);

        this.HandleShow = this.HandleShow.bind(this);
        this.HandleClose = this.HandleClose.bind(this);
        this.HandleAnswerTicketForm = this.HandleAnswerTicketForm.bind(this);

        this.state = {
            showModal: false,
        }
    }

    HandleClose() {
        this.setState({ showModal: false });
    }

    HandleShow() {
        this.setState({ showModal: true });
    }

    HandleAnswerTicketForm(event) {
        event.preventDefault();

        const et = event.target;

        AnswerTicket( this.props.id, et.formGridResponse.value )
        .then( res => {
            console.log( res );
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Ticket respondido', 'Se envió la respuesta al residente.');

                this.HandleClose()
                this.props.refresh()
            }else{
                this.AlertsHandler.generate('danger', 'Ticket no respondido', '¡Ocurrió un error! Intenta más tarde.');
            }
        });
    }

    render(){
        const { showModal } = this.state;

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />

                <Card bg={this.props.color}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} className="link" variant="link" eventKey={this.props.id}>
                            {this.props.title}
                        </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey={this.props.id}>
                        <Card.Body style={{color:"white"}}>
                            <p>{this.props.body}</p>

                            {this.props.response !== `RESPUESTA: 0`?
                                <p>{this.props.response}</p>
                                :
                                null}

                            {this.props.finalizado==0 ? <Button onClick={this.HandleShow}><FontAwesomeIcon icon={faReply} /> Responder</Button> : null}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Modal show={showModal} onHide={this.HandleClose} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Responder Ticket #{this.props.id}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleAnswerTicketForm} id="ticketForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridResponse">
                                    <Form.Label>Respuesta</Form.Label>
                                    <Form.Control as="textarea" rows="6" placeholder="Escribe aquí tu respuesta."/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="ticketForm" className="btn btn-primary" type="submit">Enviar ticket</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default SupportTicket;
