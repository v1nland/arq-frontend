import React, { Component } from 'react';
import { Card, Form, Col, Button, Row, Table } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchMultas, FetchDataTablesLang } from '../functions/Database';
import { NumberWithDots, FormatDate } from '../functions/Helper';

class Penalties extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            multas: [],
            dtlang: []
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
                    this.state.multas[i]['monto'] = NumberWithDots( this.state.multas[i]['monto'] )
                    this.state.multas[i]['fecha'] = FormatDate( this.state.multas[i]['fecha'] )
                }
            })
            console.log( this.state.multas );
        })
    }

    render(){
        const { mes } = this.state;
        const { multas } = this.state;
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
                    label: 'Fecha',
                    field: 'fecha',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Grado',
                    field: 'grado',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Dueño (id_dpto)',
                    field: 'id_departamentos',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Causa',
                    field: 'causa',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Monto',
                    field: 'monto',
                    sort: 'asc',
                    width: 150
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
                        <Row>
                            <Col><span>Historial de multas cursadas</span></Col>
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
export default Penalties;
