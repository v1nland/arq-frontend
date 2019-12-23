import React, { Component } from 'react';
import { Modal, Card, Form, Col, Button, Row, Table } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FetchEspaciosComunes, FetchEspaciosComunesByID, FetchDataTablesLang, InsertEspacioComun, UpdateEspacioComun } from '../functions/Database';

class CommonSpaces extends Component{
    constructor(props, context){
        super(props, context);

        this.HandleShow = this.HandleShow.bind(this);
        this.HandleClose = this.HandleClose.bind(this);
        this.HandleInsertEspacioComun = this.HandleInsertEspacioComun.bind(this);
        this.HandleEditModalData = this.HandleEditModalData.bind(this);

        this.HandleShowEdit = this.HandleShowEdit.bind(this);
        this.HandleCloseEdit = this.HandleCloseEdit.bind(this);
        this.HandleUpdateEspacioComun = this.HandleUpdateEspacioComun.bind(this);

        this.onVarChange = this.onVarChange.bind(this)

        this.state = {
            espaciosComunes: [],
            dtlang: [],
            showModal: false,
            showEditModal: false,
            idEdit: -1,
            editData: {}
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
            this.setState({ espaciosComunes: res.rows }, () => {
                for (var i = 0; i < this.state.espaciosComunes.length; i++) {
                    var cur_id = this.state.espaciosComunes[i]['id']

                    this.state.espaciosComunes[i]['acciones'] = <Button size="sm" id={cur_id} onClick={this.HandleEditModalData}><FontAwesomeIcon icon={faEdit} /></Button>
                }
            })
            console.log( this.state.espaciosComunes );
        })
    }

    HandleEditModalData( e ){
        e.preventDefault();

        var idEdit = e.currentTarget.id;

        FetchEspaciosComunesByID( idEdit )
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

    HandleInsertEspacioComun(event) {
        event.preventDefault();

        const et = event.target;

        InsertEspacioComun( et.formGridNombre.value, et.formGridCodigo.value, et.formGridEstado.value, et.formGridDescripcion.value )
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

    HandleUpdateEspacioComun(event) {
        event.preventDefault();

        const et = event.target;

        UpdateEspacioComun( et.formGridNombre.value, et.formGridEstado.value, et.formGridCondID.value, et.formGridDesc.value )
        .then( res => {
            if (res.count === 0) {
                this.AlertsHandler.generate('success', 'Espacio modificado', 'Se actualizaron los datos del espacio común.');
            }else{
                this.AlertsHandler.generate('danger', 'Espacio no modificado', '¡Ocurrió un error! Intenta más tarde.');
            }
        })
        .then( r => {
            this.RefreshEspaciosComunes()
            this.HandleCloseEdit()
        })
    }

    onVarChange(chng, value){
        this.setState({ [chng]: value });
    }

    render(){
        const { espaciosComunes } = this.state;
        const { dtlang } = this.state;
        const { showModal } = this.state;
        const { showEditModal } = this.state;
        const { editData } = this.state;

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
                    label: 'Condominio',
                    field: 'nombre_cond',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Descripción',
                    field: 'descripcion',
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
            rows: espaciosComunes,
            language: dtlang
        };

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Espacios Comunes" />

                <Card>
                    <Card.Header>
                        <span>Listado detallado de espacios comunes</span>
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
                        <Modal.Title>Agregar espacio común</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleInsertEspacioComun} id="espacioForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridNombre">
                                    <Form.Label>Nombre del espacio</Form.Label>
                                    <Form.Control type="text" placeholder="Piscina"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCodigo">
                                    <Form.Label>Código condominio</Form.Label>
                                    <Form.Control type="text" placeholder="ARQSM"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEstado">
                                    <Form.Label>Estado actual</Form.Label>
                                    <Form.Control type="text" placeholder="Operativo"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDescripcion">
                                    <Form.Label>Descripción del espacio</Form.Label>
                                    <Form.Control as="textarea" rows="5" placeholder="Utilizado por los vecinos para bañarse"/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="espacioForm" className="btn btn-primary" type="submit">Agregar espacio</Button>
                        <Button className="btn btn-secondary" onClick={this.HandleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={this.HandleCloseEdit} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Modificar datos del espacio común #{this.state.idEdit}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.HandleUpdateEspacioComun} id="espacioEditForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" defaultValue={editData.nombre}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row style={{display: 'none'}}>
                                <Form.Group as={Col} controlId="formGridCondID">
                                    <Form.Label>ID de espacio común</Form.Label>
                                    <Form.Control type="text" value={editData.id} readOnly />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEstado">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control as="textarea" rows="3" defaultValue={editData.estado}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDesc">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows="3" defaultValue={editData.descripcion}/>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="espacioEditForm" className="btn btn-primary" type="submit">Modificar</Button>
                        {/*<Button className="btn btn-danger" type="submit">Eliminar</Button>*/}
                        <Button className="btn btn-secondary" onClick={this.HandleCloseEdit}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default CommonSpaces;
