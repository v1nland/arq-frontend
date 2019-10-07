import React, { Component } from 'react';
import { Row, Col, Card, Table, Dropdown, DropdownButton } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class CommonExpensesBalance extends Component {
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
                <PageTitle text="Pago de gastos comunes" />

                <Card>
                    <Card.Header>
                        <Row>
                            <Col><span>{'Balance de gastos comunes: ' + mes}</span></Col>
                        </Row>
                    </Card.Header>

                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Dueño</th>
                                <th>Gasto común</th>
                                <th>Pago</th>
                                <th>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>201</td>
                                <td>01/01/2019</td>
                                <td>Martín Saavedra</td>
                                <td>1000</td>
                                <td>400</td>
                                <td>-600</td>
                            </tr>

                            <tr>
                                <td>202</td>
                                <td>01/01/2019</td>
                                <td>Paula Núñez</td>
                                <td>2000</td>
                                <td>1000</td>
                                <td>-1000</td>
                            </tr>

                            <tr>
                                <td>203</td>
                                <td>01/01/2019</td>
                                <td>Miguel Saavedra</td>
                                <td>1000</td>
                                <td>2000</td>
                                <td>1000</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        );
    }
}
export default CommonExpensesBalance;
