import React, { Component } from 'react';
import { Row, Col, Card, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { GetUserData } from '../functions/JWT';
import { FetchDepartamentos, FetchDataTablesLang } from '../functions/Database';

class Neighbors extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            dptos: [],
            dtlang: []
        }
    }

    componentDidMount(){
        FetchDepartamentos()
        .then(res => {
            this.setState({ dptos: res.rows })
        })

        FetchDataTablesLang()
        .then(res => {
            this.setState({ dtlang: res })
        })
    }

    render(){
        const { dptos } = this.state;
        const { dtlang } = this.state;

        const data = {
            columns: [
                {
                    label: '#',
                    field: 'numero',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Dueño',
                    field: 'dueno',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Residente',
                    field: 'residente',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Telefono',
                    field: 'telefono',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Correo',
                    field: 'correo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Prorrateo (%)',
                    field: 'prorrateo',
                    sort: 'asc',
                    width: 100
                }
            ],
            rows: dptos,
            language: dtlang
        };

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Datos de vecinos" />

                <Card>
                    <Card.Header>
                        <Row>
                            <Col>Visualiza los datos de los vecinos</Col>
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
        )
    }
}
export default Neighbors;
