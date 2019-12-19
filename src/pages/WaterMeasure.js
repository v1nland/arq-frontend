import React, { Component } from 'react';
import { Modal, Card, Form, Col, Button, Row, Table } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchMedicionesAgua, FetchDataTablesLang, InsertMedicionAgua } from '../functions/Database';
import { NumberWithDots } from '../functions/Helper';

class WaterMeasure extends Component{
    constructor(props, context){
        super(props, context);

        this.HandleShow = this.HandleShow.bind(this);
        this.HandleClose = this.HandleClose.bind(this);
        this.HandleInsertMedicionAgua = this.HandleInsertMedicionAgua.bind(this);

        this.state = {
            mediciones: [],
            dtlang: [],
            showModal: false
        }
    }

    componentDidMount(){
        this.RefreshMedicionesAgua();

        FetchDataTablesLang()
        .then(res => {
            this.setState({ dtlang: res })
        })
    }

    RefreshMedicionesAgua(){
        FetchMedicionesAgua()
        .then(res => {
            this.setState({ mediciones: res.rows }, () => {
                for (var i = 0; i < this.state.mediciones.length; i++) {
                    this.state.mediciones[i]['litros'] = NumberWithDots( this.state.mediciones[i]['litros'] )
                }
            })
            console.log( this.state.mediciones );
        })
    }

    HandleClose() {
        this.setState({ showModal: false });
    }

    HandleShow() {
        this.setState({ showModal: true });
    }

    HandleInsertMedicionAgua(event) {
        event.preventDefault();

        const et = event.target;

        InsertMedicionAgua( et.formGridCodigo.value, et.formGridNumero.value, et.formGridLitros.value )
        .then( res => {
            console.log( res );
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Ticket respondido', 'Se envió la respuesta al residente.');
                this.RefreshMedicionesAgua()
                this.HandleClose()
            }else{
                this.AlertsHandler.generate('danger', 'Ticket no respondido', '¡Ocurrió un error! Intenta más tarde.');
            }
        });
    }

    render(){
        const { mediciones } = this.state;
        const { dtlang } = this.state;
        const { showModal } = this.state;

        const data = {
            columns: [
                {
                    label: '#',
                    field: 'id',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Fecha',
                    field: 'fecha',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Dueño (id_dpto)',
                    field: 'id_departamentos',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Litros gastados',
                    field: 'litros',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: mediciones,
            language: dtlang
        };

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Consumo de agua mensual" />

                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={9}><span>Historial de mediciones</span></Col>
                            <Col sm={3}><Button onClick={this.HandleShow}>Insertar nueva medición</Button></Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>
                        <MDBDataTable
                            striped
                            bordered
                            data={data}
                        />
                    </Card.Body>
                </Card>

                <Modal show={showModal} onHide={this.HandleClose} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Responder Ticket {this.props.id}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleInsertMedicionAgua} id="waterForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCodigo">
                                    <Form.Label>Código de condominio</Form.Label>
                                    <Form.Control type="text" placeholder="ARQSM"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridNumero">
                                    <Form.Label>Número de departamento</Form.Label>
                                    <Form.Control type="text" placeholder="2401"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridLitros">
                                    <Form.Label>Litros utilizados</Form.Label>
                                    <Form.Control type="text" placeholder="1000"/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="waterForm" className="btn btn-primary" type="submit">Agregar medición</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default WaterMeasure;
