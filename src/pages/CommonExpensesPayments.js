import React, { Component } from 'react';
import { Row, Col, Card, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { FetchPagosGC, FetchDataTablesLang } from '../functions/Database';
import { NumberWithDots } from '../functions/Helper';

class CommonExpensesPayments extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            pagos: [],
            dtlang: []
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
                    this.state.pagos[i]['monto'] = NumberWithDots( this.state.pagos[i]['monto'] )
                }
            })
            console.log( this.state.pagos );
        })
    }

    render(){
        const { mes } = this.state;
        const { pagos } = this.state;
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
                    label: 'Dueño (id_dpto)',
                    field: 'id_departamentos',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Monto',
                    field: 'monto',
                    sort: 'asc',
                    width: 150
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
                        <Row>
                            <Col><span>Historial de pagos recibidos</span></Col>
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
export default CommonExpensesPayments;
