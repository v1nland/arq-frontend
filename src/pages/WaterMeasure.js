import React, { Component } from 'react';
import { Modal, Card, Form, Col, Button, ButtonGroup, Row, Table } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import CSVReader from 'react-csv-reader';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FetchMedicionesAgua, FetchMedicionesAguaByID, FetchDataTablesLang, InsertMedicionAgua, UpdateMedicionAgua, DeleteMedicionAgua } from '../functions/Database';
import { NumberWithDots, FormatDateTime } from '../functions/Helper';

class WaterMeasure extends Component{
    constructor(props, context){
        super(props, context);

        // First modal bindings
        this.HandleShow = this.HandleShow.bind(this);
        this.HandleClose = this.HandleClose.bind(this);
        this.HandleInsertMedicionAgua = this.HandleInsertMedicionAgua.bind(this);

        this.HandleDeleteMedicion = this.HandleDeleteMedicion.bind(this);

        this.HandleCSV = this.HandleCSV.bind(this);
        this.HandleShowCSV = this.HandleShowCSV.bind(this);
        this.HandleCloseCSV = this.HandleCloseCSV.bind(this);
        this.HandleInsertMedicionAguaCSV = this.HandleInsertMedicionAguaCSV.bind(this);

        this.state = {
            mediciones: [],
            dtlang: [],
            showModal: false,
            showCSVModal: false,
            csvToInsert: [],
            file: "Subir archivo CSV"
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
                    var cur_id = this.state.mediciones[i]['id']

                    this.state.mediciones[i]['litros'] = NumberWithDots( this.state.mediciones[i]['litros'] )
                    this.state.mediciones[i]['fecha'] = FormatDateTime( this.state.mediciones[i]['fecha'] )
                    this.state.mediciones[i]['acciones'] = <Button size="sm" variant="danger" id={cur_id} onClick={this.HandleDeleteMedicion}><FontAwesomeIcon icon={faTrash} /></Button>
                }
            })
            console.log( this.state.mediciones );
        })
    }

    HandleDeleteMedicion( e ){
        var idDelete = e.currentTarget.id;

        DeleteMedicionAgua( idDelete )
        .then(res => {
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Medición eliminada', 'Se eliminó la medición.');
                this.RefreshMedicionesAgua()
            }else{
                this.AlertsHandler.generate('danger', 'Medición no eliminada', '¡Ocurrió un error! Intenta más tarde.');
            }
        })
    }

    HandleClose() {
        this.setState({ showModal: false });
    }

    HandleShow() {
        this.setState({ showModal: true });
    }

    HandleCloseCSV() {
        this.setState({ showCSVModal: false });
    }

    HandleShowCSV() {
        this.setState({ showCSVModal: true });
    }

    HandleInsertMedicionAgua(event) {
        event.preventDefault();

        const et = event.target;

        InsertMedicionAgua( et.formGridCodigo.value, et.formGridNumero.value, et.formGridLitros.value )
        .then( res => {
            console.log( res );
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Medición insertada', 'Se registró la medición.');
                this.RefreshMedicionesAgua()
                this.HandleClose()
            }else{
                this.AlertsHandler.generate('danger', 'Medición no insertada', '¡Ocurrió un error! Intenta más tarde.');
            }
        });
    }

    HandleInsertMedicionAguaCSV(event) {
        event.preventDefault();

        const et = event.target;
        const csvToInsert = this.state.csvToInsert;

        for (var i = 0; i < csvToInsert.length; i++) {
            const cur_val = csvToInsert[i];

            InsertMedicionAgua( cur_val[0], cur_val[1], cur_val[2] )
            .then( res => {
                if (res.count === 0) {
                    this.AlertsHandler.generate('success', 'Medición insertada', 'Se registró la medición.');
                }else{
                    this.AlertsHandler.generate('danger', 'Medición no insertada', '¡Ocurrió un error! Intenta más tarde.');
                }
            })
            .then(r => {
                this.RefreshMedicionesAgua()
                this.HandleCloseCSV()
            })
        }
    }

    HandleCSV( data ){
        this.setState({ csvToInsert: data })
        this.setState({ file: "Archivo subido exitosamente" })
    }

    render(){
        const { mediciones } = this.state;
        const { dtlang } = this.state;
        const { showModal } = this.state;
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
                    label: 'Litros gastados',
                    field: 'litros',
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
            rows: mediciones,
            language: dtlang
        };

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Consumo de agua mensual" />

                <Card>
                    <Card.Header>
                        <span>Historial de mediciones</span>
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
                        <Modal.Title>Insertar nueva medición</Modal.Title>
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

                <Modal show={showCSVModal} onHide={this.HandleCloseCSV} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Insertar nuevas mediciones</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleInsertMedicionAguaCSV} id="waterCSVForm">
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
                        <Button form="waterCSVForm" className="btn btn-primary" type="submit">Agregar mediciones</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleCloseCSV}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default WaterMeasure;
