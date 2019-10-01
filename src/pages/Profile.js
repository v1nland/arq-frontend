import React, { Component } from 'react';
import { Image, Card, CardGroup, CardDeck, Badge, Col, Row, Accordion, Button, InputGroup, FormControl } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';
import SupportTicket from '../components/Utility/SupportTicket';
import ProfileData from '../components/Utility/ProfileData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faUser, faHome, faDoorClosed, faLock, faParking } from '@fortawesome/free-solid-svg-icons';

import Picture from '../images/profile.jpg';

class Profile extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Mi Perfil" />

                <CardDeck>
                    <Card>
                        <Card.Header>Mis datos</Card.Header>

                        <Card.Body>
                            <Row>
                                <Col>
                                    <Image className="profile-picture" src={Picture} roundedCircle responsive/>
                                </Col>
                            </Row>

                            <br />

                            <ProfileData
                                icon=<FontAwesomeIcon icon={faUser} fixedWidth />
                                title="Nombre"
                                value="Martín Saavedra"
                                badge=<Badge className="profile-data-badge" pill variant="primary">Comité</Badge>
                            />

                            <ProfileData
                                icon=<FontAwesomeIcon icon={faHome} fixedWidth />
                                title="Tipo"
                                value="Arrendatario"
                            />

                            <ProfileData
                                icon=<FontAwesomeIcon icon={faDoorClosed} fixedWidth />
                                title="Dpto."
                                value="2401"
                            />

                            <ProfileData
                                icon=<FontAwesomeIcon icon={faLock} fixedWidth />
                                title="Bodega"
                                value="#103"
                            />

                            <ProfileData
                                icon=<FontAwesomeIcon icon={faParking} fixedWidth />
                                title="Parking"
                                value="#96 (DB-DX-79)"
                            />
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Mis tickets</Card.Header>

                        <Card.Body>
                            <Accordion>
                                <SupportTicket
                                    id="0"
                                    color="danger"
                                    title="Ticket #923492"
                                    body="Hola querido comité ARQ."
                                />

                                <SupportTicket
                                    id="1"
                                    color="success"
                                    title="Ticket #843324"
                                    body="Este es otro mensaje recibido."
                                />
                            </Accordion>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}
export default Profile;
