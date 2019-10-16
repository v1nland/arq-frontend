import React, { Component } from 'react';
import { Card, Form, Col, Button, Row, Table } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WaterMeasure extends Component{
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
                <PageTitle text="Consumo de agua mensual" />

                <Card>
                    <Card.Header>
                        <Row>
                            <Col><span>{'Mediciones del mes: ' + mes}</span></Col>
                        </Row>
                    </Card.Header>

                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Dueño</th>
                                <th>Litros gastados</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>201</td>
                                <td>01/01/2019</td>
                                <td>Martín Saavedra</td>
                                <td>100L</td>
                            </tr>

                            <tr>
                                <td>202</td>
                                <td>01/01/2019</td>
                                <td>Paula Núñez</td>
                                <td>500L</td>
                            </tr>

                            <tr>
                                <td>203</td>
                                <td>01/01/2019</td>
                                <td>Miguel Saavedra</td>
                                <td>1000L</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        );
    }
}
export default WaterMeasure;
