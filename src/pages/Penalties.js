import React, { Component } from 'react';
import { Modal, Card, Form, Col, Button, Row, Table } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FetchMultas, FetchMultasByID, FetchDataTablesLang, InsertMulta, UpdateMulta } from '../functions/Database';
import { NumberWithDots, FormatDate } from '../functions/Helper';

class Penalties extends Component{
    constructor(props, context){
        super(props, context);

        this.HandleShow = this.HandleShow.bind(this);
        this.HandleClose = this.HandleClose.bind(this);
        this.HandleInsertMulta = this.HandleInsertMulta.bind(this);

        // Second modal bindings
        this.HandleShowEdit = this.HandleShowEdit.bind(this);
        this.HandleCloseEdit = this.HandleCloseEdit.bind(this);
        this.HandleEditModalData = this.HandleEditModalData.bind(this);
        this.HandleUpdateMulta = this.HandleUpdateMulta.bind(this);

        this.state = {
            multas: [],
            dtlang: [],
            showModal: false,
            showEditModal: false,
            idEdit: -1,
            editData: {}
        }
    }

    componentDidMount(){
        this.RefreshMultas()

        FetchDataTablesLang()
        .then(res => {
            this.setState({ dtlang: res })
        })
    }

    RefreshMultas(){
        FetchMultas()
        .then(res => {
            this.setState({ multas: res.rows }, () => {
                for (var i = 0; i < this.state.multas.length; i++) {
                    var cur_id = this.state.multas[i]['id']
                    var grado = this.state.multas[i]['grado']

                    this.state.multas[i]['monto'] = '$'+NumberWithDots( this.state.multas[i]['monto'] )
                    this.state.multas[i]['fecha'] = FormatDate( this.state.multas[i]['fecha'] )
                    this.state.multas[i]['acciones'] = <Button size="sm" id={cur_id} onClick={this.HandleEditModalData}><FontAwesomeIcon icon={faEdit} /></Button>
                }
            })
            console.log( this.state.multas );
        })
    }

    HandleEditModalData( e ){
        var idEdit = e.currentTarget.id;

        FetchMultasByID( idEdit )
        .then(res => {
            this.setState({ editData: res.rows[0] }, () => {
                this.setState({ idEdit: idEdit }, () => {
                    this.HandleShowEdit()
                })
            })
        })
    }

    HandleClose() {
        this.setState({ showModal: false });
    }

    HandleShow() {
        this.setState({ showModal: true });
    }

    HandleCloseEdit() {
        this.setState({ showEditModal: false });
    }

    HandleShowEdit() {
        this.setState({ showEditModal: true });
    }

    HandleInsertMulta(event) {
        event.preventDefault();

        const et = event.target;

        InsertMulta( et.formGridCodigo.value, et.formGridNumero.value, et.formGridMonto.value, et.formGridCausa.value )
        .then( res => {

            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Multa cursada', 'Se cursó la multa en el sistema.');
                this.RefreshMultas()
                this.HandleClose()
            }else{
                this.AlertsHandler.generate('danger', 'Multa no cursada', '¡Ocurrió un error! Intenta más tarde.');
            }
        });
    }

    HandleUpdateMulta(event) {
        event.preventDefault();

        const et = event.target;

        UpdateMulta( et.formGridFecha.value, et.formGridGrado.value, et.formGridMonto.value, et.formGridCausa.value, et.formGridDptoID.value, et.formGridMultaID.value )
        .then( res => {
            console.log( res );
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Multa modificada', 'Los datos han sido modificados en el servidor.');
            }else{
                this.AlertsHandler.generate('danger', 'Multa no modificada', '¡Ocurrió un error! Intenta más tarde.');
            }
        })
        .then( r => {
            this.RefreshMultas()
            this.HandleCloseEdit()
        });
    }

    render(){
        const { mes } = this.state;
        const { multas } = this.state;
        const { dtlang } = this.state;
        const { showModal } = this.state;
        const { showEditModal } = this.state;
        const { editData } = this.state;

        const data = {
            columns: [
                {
                    label: '#',
                    field: 'id',
                    sort: 'desc',
                    width: 150
                },
                {
                    label: 'Fecha',
                    field: 'fecha',
                    sort: 'desc',
                    width: 150
                },
                {
                    label: 'Dpto.',
                    field: 'num_dpto',
                    sort: 'desc',
                    width: 200
                },
                {
                    label: 'Causa',
                    field: 'causa',
                    sort: 'desc',
                    width: 100
                },
                {
                    label: 'Grado',
                    field: 'grado',
                    sort: 'desc',
                    width: 270
                },
                {
                    label: 'Monto',
                    field: 'monto',
                    sort: 'desc',
                    width: 150
                },
                {
                    label: '',
                    field: 'acciones',
                    sort: 'asc',
                    width: 50
                }
            ],
            rows: multas,
            language: dtlang
        };

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Multas cursadas" />

                <Card>
                    <Card.Header>
                        {<span>Historial de multas cursadas</span>}
                        <Button className="float-right" onClick={this.HandleShow}><FontAwesomeIcon icon={faPlus} /> Agregar</Button>
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
                        <Modal.Title>Insertar nueva multa</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleInsertMulta} id="waterForm">
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
                                <Form.Group as={Col} controlId="formGridMonto">
                                    <Form.Label>Monto a pagar</Form.Label>
                                    <Form.Control type="text" placeholder="1000"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCausa">
                                    <Form.Label>Motivo de la multa</Form.Label>
                                    <Form.Control as="textarea" rows="5" placeholder="Se reitera falta durante meses"/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="waterForm" className="btn btn-primary" type="submit">Cursar multa</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={this.HandleCloseEdit} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Modificar datos de la multa #{this.state.idEdit}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleUpdateMulta} id="penaltyEditForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFecha">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="text" defaultValue={editData.fecha}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDptoID">
                                    <Form.Label>ID de departamento (avanzado)</Form.Label>
                                    <Form.Control type="text" defaultValue={editData.id_departamentos}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridMonto">
                                    <Form.Label>Monto a pagar</Form.Label>
                                    <Form.Control type="text" defaultValue={editData.monto}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridGrado">
                                    <Form.Label>Grado de la multa</Form.Label>
                                    <Form.Control type="text" defaultValue={editData.grado}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCausa">
                                    <Form.Label>Motivo de la multa</Form.Label>
                                    <Form.Control as="textarea" rows="5" defaultValue={editData.causa}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row style={{display: 'none'}}>
                                <Form.Group as={Col} controlId="formGridMultaID">
                                    <Form.Label>ID de espacio común</Form.Label>
                                    <Form.Control type="text" value={editData.id} readOnly />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="penaltyEditForm" className="btn btn-primary" type="submit">Modificar</Button>
                        {/*<Button className="btn btn-danger" type="submit">Eliminar</Button>*/}
                        <Button className="btn btn-secondary" onClick={this.HandleCloseEdit}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Penalties;
