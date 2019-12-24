import React, { Component } from 'react';
import { Modal, Form, Button, ButtonGroup, Row, Col, Card, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import CSVReader from 'react-csv-reader';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faCheckCircle, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

import { InsertGC, FetchDepartamentos, FetchSumaGCByDptoID, FetchSumaPagosGCByDptoID } from '../functions/Database';
import { NumberWithDots, FormatDateTime } from '../functions/Helper';

class CommonExpensesBalance extends Component {
    constructor(props, context){
        super(props, context);

        this.RefreshGCs = this.RefreshGCs.bind(this)

        // First modal bindings
        this.HandleShow = this.HandleShow.bind(this);
        this.HandleClose = this.HandleClose.bind(this);
        this.HandleInsertGC = this.HandleInsertGC.bind(this);

        this.state = {
            dptos: [],
            done: false,
            dptos_final: [],
            showModal: false,
        }
    }

    async componentDidMount(){
        this.RefreshGCs()
    }

    RefreshGCs(){
        FetchDepartamentos()
        .then(res => {
            this.setState({ dptos: res.rows }, () => {
                for (const dpto of this.state.dptos) {

                    FetchSumaGCByDptoID(dpto.id)
                    .then(r => {
                        dpto['total'] = r.rows[0].suma;

                        FetchSumaPagosGCByDptoID(dpto.id)
                        .then(r => {
                            dpto['sumpagos'] = r.rows[0].suma;
                        })
                        .then(_ => {
                            dpto['saldo'] = dpto['sumpagos']-dpto['total']

                            dpto['total'] = '$'+NumberWithDots(dpto['total'])
                            dpto['sumpagos'] = '$'+NumberWithDots(dpto['sumpagos'])
                            dpto['saldo'] = '$'+NumberWithDots(dpto['saldo'])
                            this.setState({ dptos_final: this.state.dptos })
                        })
                    })

                }
            })
        })
    }

    HandleClose() {
        this.setState({ showModal: false });
    }

    HandleShow() {
        this.setState({ showModal: true });
    }

    HandleInsertGC(event) {
        event.preventDefault();

        const et = event.target;

        InsertGC( et.formGridCodigo.value, et.formGridNumero.value, et.formGridMonto.value, 'El detalle' )
        .then( res => {
            console.log( res );
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Gasto Común enviado', 'Se envió el gasto común.');
                this.RefreshGCs()
                this.HandleClose()
            }else{
                this.AlertsHandler.generate('danger', 'Gasto Común enviado', '¡Ocurrió un error! Intenta más tarde.');
            }
        });
    }

    render(){
        const { dptos_final } = this.state;
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
                    label: 'Dpto.',
                    field: 'numero',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Gasto Común',
                    field: 'total',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Pagos',
                    field: 'sumpagos',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Saldo',
                    field: 'saldo',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: dptos_final,
            language: dtlang
        };

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Balance de gastos comunes" />

                <Card>
                    <Card.Header>
                        <span>Balance de gastos comunes</span>
                        {/*<ButtonGroup className="float-right">
                            <Button variant="success" onClick={this.HandleShowCSV}><FontAwesomeIcon icon={faPlus} /> CSV</Button>*/}
                            <Button className="float-right" onClick={this.HandleShow}><FontAwesomeIcon icon={faPlus} /> Agregar</Button>
                        {/*</ButtonGroup>*/}
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
                        <Modal.Title>Insertar nueva medición</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleInsertGC} id="gcForm">
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
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="gcForm" className="btn btn-primary" type="submit">Enviar gasto común</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default CommonExpensesBalance;
