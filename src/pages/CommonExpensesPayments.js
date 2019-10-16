import React, { Component } from 'react';
import { Row, Col, Card, Table, Dropdown, DropdownButton } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class CommonExpensesPayments extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            mes: 'Enero'
        }
    }

    render(){
        const { mes } = this.state;
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Historial de pagos" />

                <Card>
                    <Card.Header>
                        <Row>
                            <Col><span>{'Pagos realizados durante: ' + mes}</span></Col>
                        </Row>
                    </Card.Header>

                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Nombre</th>
                                <th>Medio de pago</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>201</td>
                                <td>01/01/2019</td>
                                <td>Martín Saavedra</td>
                                <td>Transferencia</td>
                                <td>500.000</td>
                            </tr>

                            <tr>
                                <td>202</td>
                                <td>01/01/2019</td>
                                <td>Paula Núñez</td>
                                <td>Efectivo</td>
                                <td>100.000</td>
                            </tr>

                            <tr>
                                <td>203</td>
                                <td>01/01/2019</td>
                                <td>Miguel Saavedra</td>
                                <td>Efectivo</td>
                                <td>200.000</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        );
    }
}
export default CommonExpensesPayments;
