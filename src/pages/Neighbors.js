import React, { Component } from 'react';
import { Row, Col, Card, Table, Dropdown, DropdownButton } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';

class Neighbors extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Vecinos" />

                <Card>
                    <Card.Header>
                        <Row>
                            <Col>Visualiza los datos de los vecinos</Col>
                        </Row>
                    </Card.Header>

                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Dueño</th>
                                <th>Arrendatario</th>
                                <th>Contacto</th>
                                <th>Bodega</th>
                                <th>Estacionamiento</th>
                                <th>Prorrat.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>201</td>
                                <td>Martín Saavedra</td>
                                <td>Juan Pérez</td>
                                <td>+569 50731812</td>
                                <td>101</td>
                                <td>96 (DB-DX-79)</td>
                                <td>0.1%</td>
                            </tr>

                            <tr>
                                <td>202</td>
                                <td>Paula Núñez</td>
                                <td>Juana Pérez</td>
                                <td>+569 50731813</td>
                                <td>102</td>
                                <td>97 (DB-DX-80)</td>
                                <td>0.2%</td>
                            </tr>

                            <tr>
                                <td>203</td>
                                <td>Miguel Saavedra</td>
                                <td>Juanito Pérez</td>
                                <td>+569 50731814</td>
                                <td>103</td>
                                <td>98 (DB-DX-81)</td>
                                <td>0.3%</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        )
    }
}
export default Neighbors;
