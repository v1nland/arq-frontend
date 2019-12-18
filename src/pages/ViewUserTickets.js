import React, { Component } from 'react';
import { Accordion, Card, Button, Grid, Row, Col, Tab, Tabs, Modal } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';
import SupportTicket from '../components/Utility/SupportTicket';

import { FetchTicketsDpto } from '../functions/Database';
import { GetUserData } from '../functions/JWT';

class ViewUserTickets extends Component{
    constructor(props, context){
        super(props, context);

        this.RefreshTickets = this.RefreshTickets.bind(this);

        this.state = {
            tickets: [],
            userData: []
        }
    }

    componentDidMount(){
        this.RefreshTickets();
    }

    RefreshTickets(){
        GetUserData()
        .then(r => {
            this.setState({ userData: r.rows })

            FetchTicketsDpto( r['id'] )
            .then(res => {
                this.setState({ tickets: res.rows })
            })
        })
    }

    renderTicket = ({id, id_departamentos, id_usuarios, asunto, consulta, respuesta, finalizado, fecha}) => (
        <SupportTicket key={id}
            id={id}
            color={finalizado==0 ? "danger" : "success"}
            title={`[Dpto. ${id}] ${asunto} - ${fecha}`}
            body={`CONSULTA: ${consulta}`}
            response={`RESPUESTA: ${respuesta}`}
            finalizado={1}
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
                    {tickets != null?
                        tickets.map( this.renderTicket )
                        :
                        "No has enviado ningún ticket."}
                </Accordion>
            </div>
        );
    }
}
export default ViewUserTickets;
