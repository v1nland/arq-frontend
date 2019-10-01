import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

// Utility components
import CenteredSpinner from '../components/Utility/CenteredSpinner';
import PageTitle from '../components/Utility/PageTitle';
import AlertsHandler from '../components/Utility/AlertsHandler';
import SupportTicket from '../components/Utility/SupportTicket';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

class ViewTickets extends Component{
    render(){
        return(
            <div>
                <AlertsHandler onRef={ref => (this.AlertsHandler = ref)} />
                <PageTitle text="Tickets recibidos" />

                <Accordion>
                    <SupportTicket
                        id="0"
                        color="danger"
                        title="[Dpto. 2401] Martín Saavedra - 12/08/19 14:00hrs."
                        body="Hola querido comité ARQ."
                        responseButton=<Button><FontAwesomeIcon icon={faReply} /> Responder</Button>
                    />

                    <SupportTicket
                        id="1"
                        color="success"
                        title="[Dpto. 2401] Paula Núñez - 12/08/19 14:00hrs."
                        body="Este es otro mensaje recibido."
                        responseButton=<Button><FontAwesomeIcon icon={faReply} /> Responder</Button>
                    />
                </Accordion>
            </div>
        );
    }
}
export default ViewTickets;
