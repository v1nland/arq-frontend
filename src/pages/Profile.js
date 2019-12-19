import React, { Component } from 'react';
import { Image, Card, CardGroup, CardDeck, Badge, Col, Row, Accordion, Button, InputGroup, FormControl } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';
import SupportTicket from '../components/Utility/SupportTicket';
import ProfileData from '../components/Utility/ProfileData';

import { Logout } from '../functions/Session'
import { FetchUserData } from '../functions/Database';
import { FormatRUT } from '../functions/RUT'
import { GetUserData } from '../functions/JWT';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faIdCard, faUser, faHome, faPhone, faEnvelope, faDoorClosed, faParking } from '@fortawesome/free-solid-svg-icons';

import Picture from '../images/profile.jpg';

class Profile extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            userData: []
        }
    }

    componentDidMount(){
        GetUserData()
        .then( res => {
            this.setState({ userData: res })
            console.log( res );
        })
    }

    HandleLogout(event){
        Logout()

        window.location.reload()
    }

    render(){
        const { userData } = this.state;
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
                                    <Image className="profile-picture" src={Picture} roundedCircle />
                                </Col>
                            </Row>

                            {userData.rut?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faIdCard} fixedWidth />
                                title="RUT"
                                value={ userData.rut }
                            />:
                            null}

                            {userData.nombre?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faUser} fixedWidth />
                                title="Nombre"
                                value={userData.nombre}
                                badge=<Badge className="profile-data-badge" pill variant="success">Comité/Administración</Badge>
                            />
                            :
                            null}

                            {userData.dueno?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faUser} fixedWidth />
                                title="Nombre"
                                value={userData.dueno}
                                badge=<Badge className="profile-data-badge" pill variant="primary">Propietario</Badge>
                            />
                            :
                            null}

                            {userData.numero?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faHome} fixedWidth />
                                title="Dpto."
                                value={userData.numero}
                            />
                            :
                            null}

                            {userData.telefono?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faPhone} fixedWidth />
                                title="Teléfono"
                                value={userData.telefono}
                            />
                            :
                            null}

                            {userData.correo?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faEnvelope} fixedWidth />
                                title="Correo"
                                value={userData.correo}
                            />
                            :
                            null}

                            {userData.bodega?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faDoorClosed} fixedWidth />
                                title="Bodega"
                                value="#103"
                            />
                            :
                            null}

                            {userData.estacionamiento?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faParking} fixedWidth />
                                title="Parking"
                                value="#96 (DB-DX-79)"
                            />
                            :
                            null}

                            <hr />

                            {userData.residente?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faUser} fixedWidth />
                                title="Residente"
                                value={userData.residente}
                                badge=<Badge className="profile-data-badge" pill variant="warning">Residente</Badge>
                            />
                            :
                            null}

                            {userData.telefono_residente?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faPhone} fixedWidth />
                                title="Teléfono"
                                value={userData.telefono_residente}
                            />
                            :
                            null}

                            {userData.correo_residente?
                            <ProfileData
                                icon=<FontAwesomeIcon icon={faEnvelope} fixedWidth />
                                title="Correo"
                                value={userData.correo_residente}
                            />
                            :
                            null}

                            <br />

                            <center><Button variant="danger" onClick={() => this.HandleLogout()}>Cerrar sesión</Button></center>
                        </Card.Body>
                    </Card>

                    <Card>
                        {userData.level === 'user'?
                        <Card.Header>Mis tickets enviados</Card.Header>
                        :
                        <Card.Header>Tickets recibidos</Card.Header>}

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
