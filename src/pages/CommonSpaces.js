import React, { Component } from 'react';
import { Modal, Card, Form, Col, Button, Row, Table } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchEspaciosComunes, FetchDataTablesLang, InsertEspacioComun } from '../functions/Database';

class CommonSpaces extends Component{
    constructor(props, context){
        super(props, context);

        this.HandleShow = this.HandleShow.bind(this);
        this.HandleClose = this.HandleClose.bind(this);
        this.HandleInsertEspacioComun = this.HandleInsertEspacioComun.bind(this);

        this.state = {
            showModal: false,
            espaciosComunes: [],
            dtlang: []
        }
    }

    componentDidMount(){
        this.RefreshEspaciosComunes()

        FetchDataTablesLang()
        .then(res => {
            this.setState({ dtlang: res })
        })
    }

    RefreshEspaciosComunes(){
        FetchEspaciosComunes()
        .then(res => {
            this.setState({ espaciosComunes: res.rows })
        })
    }

    HandleClose() {
        this.setState({ showModal: false });
    }

    HandleShow() {
        this.setState({ showModal: true });
    }

    HandleInsertEspacioComun(event) {
        event.preventDefault();

        const et = event.target;

        InsertEspacioComun( et.formGridNombre.value, et.formGridEstado.value )
        .then( res => {
            console.log( res );
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Espacio añadido', 'Se creó el espacio común en la base de datos.');
                this.RefreshEspaciosComunes()
                this.HandleClose()
            }else{
                this.AlertsHandler.generate('danger', 'Espacio no añadido', '¡Ocurrió un error! Intenta más tarde.');
            }
        });
    }

    render(){
        const { espaciosComunes } = this.state;
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
                    label: 'Nombre',
                    field: 'nombre',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Condominio (id_cond)',
                    field: 'id_condominio',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: espaciosComunes,
            language: dtlang
        };

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Espacios Comunes" />

                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={9}><span>Listado detallado de espacios comunes</span></Col>
                            <Col sm={3}><Button onClick={this.HandleShow}>Insertar nuevo espacio común</Button></Col>
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
                        <Modal.Title>Agregar espacio común</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleInsertEspacioComun} id="waterForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridNombre">
                                    <Form.Label>Nombre del espacio</Form.Label>
                                    <Form.Control type="text" placeholder="Piscina"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEstado">
                                    <Form.Label>Estado actual</Form.Label>
                                    <Form.Control type="text" placeholder="Operativo"/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="waterForm" className="btn btn-primary" type="submit">Agregar espacio</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default CommonSpaces;
