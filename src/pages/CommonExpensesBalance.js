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

    MonthChanger(month){
        this.setState({ mes: month });
    }

    render(){
        const { mes } = this.state;

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Gastos comunes" />

                <Card>
                    <Card.Header>
                        <Row>
                            <Col style={{marginTop:"0.4%"}}><span>{'Balance de gastos comunes: ' + mes}</span></Col>

                            <Col>
                                <DropdownButton size="sm" title="Escoger mes" style={{textAlign:'right'}}>
                                    <Dropdown.Item onClick={() => this.MonthChanger('Enero')}>Enero</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.MonthChanger('Febrero')}>Febrero</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.MonthChanger('Marzo')}>Marzo</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Dueño</th>
                                <th>Monto pagado</th>
                                <th>Por pagar</th>
                                <th>Por pagar (mes anterior)</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>201</td>
                                <td>01/01/2019</td>
                                <td>Martín Saavedra</td>
                                <td>1000</td>
                                <td>500</td>
                                <td>0</td>
                                <td>500</td>
                            </tr>

                            <tr>
                                <td>202</td>
                                <td>01/01/2019</td>
                                <td>Paula Núñez</td>
                                <td>2000</td>
                                <td>1000</td>
                                <td>0</td>
                                <td>1000</td>
                            </tr>

                            <tr>
                                <td>203</td>
                                <td>01/01/2019</td>
                                <td>Miguel Saavedra</td>
                                <td>1000</td>
                                <td>2000</td>
                                <td>500</td>
                                <td>-1500</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        );
    }
}
export default CommonExpensesBalance;
