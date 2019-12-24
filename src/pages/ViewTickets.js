import React, { Component } from 'react';
import { Accordion, Card, Button, Grid, Row, Col, Tab, Tabs, Modal } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';
import SupportTicket from '../components/Utility/SupportTicket';

import { FetchTickets } from '../functions/Database';
import { FormatDateTime } from '../functions/Helper'

class ViewTickets extends Component{
    constructor(props, context){
        super(props, context);

        this.RefreshTickets = this.RefreshTickets.bind(this);

        this.state = {
            tickets: [],
        }
    }

    componentDidMount(){
        this.RefreshTickets();
    }

    RefreshTickets(){
        FetchTickets()
        .then(res => {
            this.setState({ tickets: res.rows })
        })
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

    render(){
        const { tickets } = this.state;

        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Tickets recibidos" />

                <Accordion>
                    { tickets.map( this.renderTicket ) }
                </Accordion>
            </div>
        );
    }
}
export default ViewTickets;
