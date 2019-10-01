import React, { Component } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class UploadCommonExpenses extends Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            fileName: ''
        }
    }

    onChange = e => {
        switch (e.target.name) {
            case 'selectedFile':
                if(e.target.files.length > 0) {
                    this.setState({ fileName: e.target.files[0].name });
                }
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };

    render(){
        const { fileName } = this.state;
        let file = null;

        file = fileName ? ( <span><FontAwesomeIcon icon={faCheckCircle} size="2x"/><br />ARCHIVO SUBIDO { fileName }</span>) : ( <span><FontAwesomeIcon icon={faFileUpload} size="2x"/><br />SUBIR COMPROBANTE DE PAGO DE GASTOS COMUNES</span> );

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Gastos comunes" />

                <Card>
                    <Card.Header>Comprobante de gastos comunes</Card.Header>

                    <Card.Body>
                        <Form id="ticketForm">
                            <Form.Row>
                                <Col></Col>

                                <Form.Group as={Col} controlId="formGridReceipt">
                                    <Form.Label className="file-input">{ file }</Form.Label>
                                    <Form.Control type="file" name="selectedFile" onChange={ (event) => this.onChange(event) } style={{ display: "none" }} />
                                </Form.Group>

                                <Col></Col>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridReceipt">
                                    <Form.Label>Nombre titular banco</Form.Label>
                                    <Form.Control type="text" placeholder="Pepito Pepito"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDpto">
                                    <Form.Label>Número de departamento</Form.Label>
                                    <Form.Control type="number" min="1000" max="2600" placeholder="2005" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridMessage">
                                    <Form.Label>Comentario</Form.Label>
                                    <Form.Control as="textarea" rows="6" placeholder="Escribenos aquí tu comentario."/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Card.Body>

                    <Card.Footer className="text-center">
                        <Button form="ticketForm" type="submit">Enviar ticket</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
export default UploadCommonExpenses;
