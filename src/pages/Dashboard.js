// Packages
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card, CardDeck, Dropdown, DropdownButton } from 'react-bootstrap';

import { VerifyToken, GetSecretKey, GetUserPermissions } from '../functions/JWT';

// Components
import StatWidget from '../components/Widget/Widget';
import Donut from '../components/Donut/Donut';
import BarGraph from '../components/BarGraph/BarGraph';
import TimelineElement from '../components/Utility/TimelineElement';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';
import { Tooltip, XAxis, YAxis, Area, CartesianGrid, AreaChart, Bar, ResponsiveContainer } from '../vendor/recharts';

const data = [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, value: 600 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, value: 300 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, value: 500 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, value: 400 },
];

class Dashboard extends Component {
    constructor(props, context){
        super(props, context);

        this.state = {

        }
    }

    render() {
        if (GetUserPermissions( sessionStorage.getItem('token') ) !== 'admin') {
            return <Redirect to="/Profile" />
        }

        return (
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Escritorio" />

                <Row>
                    <Col>
                        <CardDeck>
                            <StatWidget
                                color="primary"
                                icon="fa fa-comments fa-3x"
                                count="29"
                                headerText="Comentarios"
                                footerText="Ver detalles"
                                linkTo="/#/"
                            />

                            <StatWidget
                                color="danger"
                                icon="fa fa-shopping-cart fa-3x"
                                count="124"
                                headerText="Gastos comunes"
                                footerText="Ver detalles"
                                linkTo="/#/CommonExpensesBalance"
                            />

                            <StatWidget
                                color="success"
                                icon="fa fa-tasks fa-3x"
                                count="12"
                                headerText="Tareas"
                                footerText="Ver detalles"
                                linkTo="/#/"
                            />

                            <StatWidget
                                color="warning"
                                icon="fa fa-ticket fa-3x"
                                count="13"
                                headerText="Tickets"
                                footerText="Ver detalles"
                                linkTo="/#/ViewTickets"
                            />
                        </CardDeck>
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Gráfico</Card.Header>

                                <BarGraph data={data} />
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Header>Gráfico</Card.Header>

                            <Donut data={data} color="#8884d8" innerRadius="50%" outerRadius="90%" />
                        </Card>
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Línea de tiempo</Card.Header>

                            <div className="timeline">
                                <TimelineElement
                                    inverted=""
                                    color="timeline-badge success"
                                    icon="fa fa-check"
                                    title="Lorem ipsum dolor"
                                    source="hace 11 horas, vía Twitter"
                                    body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
                                    laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia
                                    pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas
                                    suscipit facere rem dicta, debitis."
                                />

                                <TimelineElement
                                    inverted="timeline-inverted"
                                    color="timeline-badge warning"
                                    icon="fa fa-credit-card"
                                    title="Lorem ipsum dolor"
                                    source="hace 10 horas, vía Instagram"
                                    body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem
                                      quibusdam, tenetur commodi provident cumque magni voluptatem libero, quis
                                      rerum. Fugiat esse debitis optio, tempore. Animi officiis alias, officia
                                      repellendus."
                                />

                                <TimelineElement
                                    inverted=""
                                    color="timeline-badge danger"
                                    icon="fa fa-bomb"
                                    title="Lorem ipsum dolor"
                                    source="hace 9 horas, vía Facebook"
                                    body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
                                      numquam facilis enim eaque, tenetur nam id qui vel velit similique nihil
                                      iure molestias aliquam, voluptatem totam quaerat, magni commodi quisquam."
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
