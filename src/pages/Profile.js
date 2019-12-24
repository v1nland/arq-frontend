import React, { Component } from 'react';
import { Image, Card, CardGroup, CardDeck, Badge, Col, Row, Accordion, Button, InputGroup, FormControl } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';
import SupportTicket from '../components/Utility/SupportTicket';
import ProfileData from '../components/Utility/ProfileData';

import { Logout } from '../functions/Session'
import { FetchUserData, FetchDepartamentosByID, FetchTickets, FetchTicketsDpto } from '../functions/Database';
import { FormatRUT } from '../functions/RUT'
import { FormatDateTime } from '../functions/Helper'
import { GetUserData } from '../functions/JWT';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faIdCard, faUser, faHome, faPhone, faEnvelope, faDoorClosed, faParking } from '@fortawesome/free-solid-svg-icons';

import Picture from '../images/profile.jpg';

class Profile extends Component{
    constructor(props, context){
        super(props, context);

        this.RefreshTickets = this.RefreshTickets.bind(this)

        this.state = {
            userData: [],
            tickets: [],
        }
    }

    componentDidMount(){
        this.RefreshTickets()
    }

    RefreshTickets(){
        GetUserData()
        .then( res => {
            if (res.level === 'user') {
                FetchDepartamentosByID( res.id )
                .then(r => {
                    this.setState({ userData: r.rows[0] })
                    console.log( r.rows[0] );
                })

                FetchTickets()
                .then(res => {
                    this.setState({ tickets: res.rows })
                })
            }else{
                this.setState({ userData: res })

                FetchTicketsDpto( res['id'] )
                .then(res => {
                    this.setState({ tickets: res.rows })
                })
            }
        })
    }

    HandleLogout(event){
        Logout()

        window.location.reload()
    }

    renderTicket = ({id, id_departamentos, id_usuarios, asunto, consulta, respuesta, finalizado, fecha}) => (
        <SupportTicket key={id}
            id={id}
            color={finalizado==0 ? "danger" : "success"}
            title={`#${id} - ${FormatDateTime(fecha)} - ${asunto}`}
            body={`CONSULTA: ${consulta}`}
            finalizado={finalizado}
            response={`RESPUESTA: ${respuesta}`}
            refresh={this.RefreshTickets}
        />
    )

    renderUserTicket = ({id, id_departamentos, id_usuarios, asunto, consulta, respuesta, finalizado, fecha}) => (
        <SupportTicket key={id}
            id={id}
            color={finalizado==0 ? "danger" : "success"}
            title={`#${id} - ${FormatDateTime(fecha)} - ${asunto}`}
            body={`CONSULTA: ${consulta}`}
            response={`RESPUESTA: ${respuesta}`}
            finalizado={1}
            refresh={this.RefreshTickets}
        />
    )
    render(){
        const { userData } = this.state;
        const { tickets } = this.state;

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
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faIdCard} fixedWidth />
                                title="RUT"
                                value={ userData.rut }
                            />:
                            null}

                            {userData.nombre?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faUser} fixedWidth />
                                title="Nombre"
                                value={userData.nombre}
                                badge=<Badge className="profile-data-badge" pill variant="success">Comité/Administración</Badge>
                            />
                            :
                            null}

                            {userData.dueno?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faUser} fixedWidth />
                                title="Nombre"
                                value={userData.dueno}
                                badge=<Badge className="profile-data-badge" pill variant="primary">Propietario</Badge>
                            />
                            :
                            null}

                            {userData.numero?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faHome} fixedWidth />
                                title="Dpto."
                                value={userData.numero}
                            />
                            :
                            null}

                            {userData.telefono?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faPhone} fixedWidth />
                                title="Teléfono"
                                value={userData.telefono}
                            />
                            :
                            null}

                            {userData.correo?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faEnvelope} fixedWidth />
                                title="Correo"
                                value={userData.correo}
                            />
                            :
                            null}

                            {userData.n_bodega != -1 && userData.n_bodega?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faDoorClosed} fixedWidth />
                                title="Bodega"
                                value={`#${userData.n_bodega}`}
                            />
                            :
                            null}

                            {userData.n_estacionamiento != -1 && userData.n_estacionamiento?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faParking} fixedWidth />
                                title="Parking"
                                value={`#${userData.n_estacionamiento}`}
                            />
                            :
                            null}

                            <hr />

                            {userData.residente?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faUser} fixedWidth />
                                title="Residente"
                                value={userData.residente}
                                badge=<Badge className="profile-data-badge" pill variant="warning">Residente</Badge>
                            />
                            :
                            null}

                            {userData.telefono_residente?
                            <ProfileData
                                id_dpto={userData.id}
                                icon=<FontAwesomeIcon icon={faPhone} fixedWidth />
                                title="Teléfono"
                                value={userData.telefono_residente}
                            />
                            :
                            null}

                            {userData.correo_residente?
                            <ProfileData
                                id_dpto={userData.id}
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
                        <div><Card.Header>Mis tickets enviados</Card.Header>

                        <Card.Body>
                            <Accordion>
                                {tickets != null?
                                    tickets.map( this.renderUserTicket )
                                    :
                                    "No has enviado ningún ticket."}
                            </Accordion>
                        </Card.Body></div>
                        :
                        <div><Card.Header>Tickets recibidos</Card.Header>

                        <Card.Body>
                            <Accordion>
                                {tickets != null?
                                    tickets.map( this.renderTicket )
                                    :
                                    "No has recibido ningún ticket."}
                            </Accordion>
                        </Card.Body></div>}
                    </Card>
                </CardDeck>
            </div>
        );
    }
}
export default Profile;
