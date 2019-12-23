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

import { FetchPagosGC, FetchPagosGCByID, FetchDataTablesLang, InsertPagosGC, UpdatePagosGC } from '../functions/Database';
import { NumberWithDots, FormatDateTime } from '../functions/Helper';

class CommonExpensesPayments extends Component{
    constructor(props, context){
        super(props, context);

        // First modal bindings
        this.HandleShow = this.HandleShow.bind(this);
        this.HandleClose = this.HandleClose.bind(this);
        this.HandleInsertPagosGC = this.HandleInsertPagosGC.bind(this);

        // Second modal bindings
        this.HandleShowEdit = this.HandleShowEdit.bind(this);
        this.HandleCloseEdit = this.HandleCloseEdit.bind(this);
        this.HandleEditModalData = this.HandleEditModalData.bind(this);
        this.HandleUpdatePagosGC = this.HandleUpdatePagosGC.bind(this);

        // Third modal bindings
        this.HandleCSV = this.HandleCSV.bind(this);
        this.HandleShowCSV = this.HandleShowCSV.bind(this);
        this.HandleCloseCSV = this.HandleCloseCSV.bind(this);
        this.HandleInsertPagosGCCSV = this.HandleInsertPagosGCCSV.bind(this);

        this.state = {
            pagos: [],
            dtlang: [],
            showModal: false,
            showEditModal: false,
            idEdit: -1,
            editData: {},
            showCSVModal: false,
            csvToInsert: [],
            file: "Subir archivo CSV"
        }
    }

    componentDidMount(){
        this.RefreshPagosGC()

        FetchDataTablesLang()
        .then(res => {
            this.setState({ dtlang: res })
        })
    }

    RefreshPagosGC(){
        FetchPagosGC()
        .then(res => {
            this.setState({ pagos: res.rows }, () => {
                for (var i = 0; i < this.state.pagos.length; i++) {
                    var cur_id = this.state.pagos[i]['id']

                    this.state.pagos[i]['monto'] = '$'+NumberWithDots( this.state.pagos[i]['monto'] )
                    this.state.pagos[i]['fecha'] = FormatDateTime( this.state.pagos[i]['fecha'] )
                    this.state.pagos[i]['acciones'] = <Button size="sm" id={cur_id} onClick={this.HandleEditModalData}><FontAwesomeIcon icon={faEdit} /></Button>
                }
            })
            console.log( this.state.pagos );
        })
    }

    HandleEditModalData( e ){
        var idEdit = e.currentTarget.id;

        FetchPagosGCByID( idEdit )
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

    HandleCloseCSV() {
        this.setState({ showCSVModal: false });
    }

    HandleShowCSV() {
        this.setState({ showCSVModal: true });
    }

    HandleInsertPagosGC(event) {
        event.preventDefault();

        const et = event.target;

        InsertPagosGC( et.formGridCodigo.value, et.formGridNumero.value, et.formGridMonto.value )
        .then( res => {
            console.log( res );
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Pago insertada', 'Se registró el pago.');
                this.RefreshPagosGC()
                this.HandleClose()
            }else{
                this.AlertsHandler.generate('danger', 'Pago no insertada', '¡Ocurrió un error! Intenta más tarde.');
            }
        });
    }

    HandleUpdatePagosGC(event) {
        event.preventDefault();

        const et = event.target;

        UpdatePagosGC( et.formGridFecha.value, et.formGridMonto.value, et.formGridDptoID.value, et.formGridPagoID.value )
        .then( res => {
            console.log( res );
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Pago modificado', 'Los datos han sido modificados en el servidor.');
                this.RefreshPagosGC()
                this.HandleCloseEdit()
            }else{
                this.AlertsHandler.generate('danger', 'Pago no modificado', '¡Ocurrió un error! Intenta más tarde.');
            }
        });
    }

    HandleInsertPagosGCCSV(event) {
        event.preventDefault();

        const et = event.target;
        const csvToInsert = this.state.csvToInsert;

        for (var i = 0; i < csvToInsert.length; i++) {
            const cur_val = csvToInsert[i];

            InsertPagosGC( cur_val[0], cur_val[1], cur_val[2] )
            .then( res => {
                if (res.count === 0) {
                    this.AlertsHandler.generate('success', 'Medición insertada', 'Se registró la medición.');
                }else{
                    this.AlertsHandler.generate('danger', 'Medición no insertada', '¡Ocurrió un error! Intenta más tarde.');
                }
            })
            .then( r => {
                this.RefreshPagosGC()
                this.HandleCloseCSV()
            })
        }
    }

    HandleCSV( data ){
        this.setState({ csvToInsert: data })
        this.setState({ file: "Archivo subido exitosamente" })
    }

    render(){
        const { pagos } = this.state;
        const { dtlang } = this.state;
        const { showModal } = this.state;
        const { showEditModal } = this.state;
        const { editData } = this.state;
        const { showCSVModal } = this.state;
        const { file } = this.state;

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
                    label: 'Dpto.',
                    field: 'num_dpto',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Monto',
                    field: 'monto',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: '',
                    field: 'acciones',
                    sort: 'asc',
                    width: 50
                }
            ],
            rows: pagos,
            language: dtlang
        };

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Historial de pagos" />

                <Card>
                    <Card.Header>
                        <span>Historial de pagos recibidos</span>
                        <ButtonGroup className="float-right">
                            <Button variant="success" onClick={this.HandleShowCSV}><FontAwesomeIcon icon={faPlus} /> CSV</Button>
                            <Button onClick={this.HandleShow}><FontAwesomeIcon icon={faPlus} /> Agregar</Button>
                        </ButtonGroup>
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
                        <Modal.Title>Insertar nuevo pago</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleInsertPagosGC} id="pagoForm">
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
                                    <Form.Label>Monto pagado</Form.Label>
                                    <Form.Control type="text" placeholder="100000"/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="pagoForm" className="btn btn-primary" type="submit">Agregar pago</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={this.HandleCloseEdit} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Modificar datos del pago #{this.state.idEdit}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleUpdatePagosGC} id="pagosEditForm">
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
                                    <Form.Label>Monto pagado</Form.Label>
                                    <Form.Control type="text" defaultValue={editData.monto}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row style={{display: 'none'}}>
                                <Form.Group as={Col} controlId="formGridPagoID">
                                    <Form.Label>ID de pago</Form.Label>
                                    <Form.Control type="text" value={editData.id} readOnly />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="pagosEditForm" className="btn btn-primary" type="submit">Modificar</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleCloseEdit}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showCSVModal} onHide={this.HandleCloseCSV} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Insertar nuevos pagos</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleInsertPagosGCCSV} id="pagosCSVForm">
                            <Form.Group as={Col} style={{textAlign: 'center'}}>
                                <Form.Label className="file-input" htmlFor="csv-button">{ file }</Form.Label>
                                <CSVReader
                                    onFileLoaded={this.HandleCSV}
                                    inputId="csv-button"
                                    inputStyle={{display: 'none'}}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="pagosCSVForm" className="btn btn-primary" type="submit">Agregar pagos</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleCloseCSV}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default CommonExpensesPayments;
