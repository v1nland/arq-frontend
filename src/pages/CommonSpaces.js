import React, { Component } from 'react';
import { Card, Form, Col, Button, Row, Table } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchEspaciosComunes, FetchDataTablesLang } from '../functions/Database';

class CommonSpaces extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            espaciosComunes: [],
            dtlang: []
        }
    }

    componentDidMount(){
        FetchEspaciosComunes()
        .then(res => {
            this.setState({ espaciosComunes: res.rows })
        })

        FetchDataTablesLang()
        .then(res => {
            this.setState({ dtlang: res })
        })
    }

    render(){
        const { espaciosComunes } = this.state;
        const { dtlang } = this.state;

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
                            <Col><span>Listado detallado de espacios comunes</span></Col>
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
            </div>
        );
    }
}
export default CommonSpaces;
