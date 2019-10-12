import React, { Component } from 'react';
import { Card, Form, Col, Button, Tab, Tabs, Row, Nav } from 'react-bootstrap';

// Forms
import UserLoginForm from './UserLoginForm';
import NeighborLoginForm from './NeighborLoginForm';

// Utility components
import CenteredSpinner from '../Utility/CenteredSpinner';
import PageTitle from '../Utility/PageTitle';
import AlertsHandler from '../Utility/AlertsHandler';

class LoginForm extends Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            ShowLoginScreen: true
        }
    }

    render(){
        return(
            <div className="login-form">
                <Tab.Container id="login-tabs" defaultActiveKey={1}>
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Tab.Content>
                                    <Nav.Item>
                                        <Nav.Link eventKey={1}>
                                            Ingreso Administrador
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey={2}>
                                            Ingreso Residentes
                                        </Nav.Link>
                                    </Nav.Item>
                                </Tab.Content>
                            </Nav>
                        </Col>

                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey={1}>
                                    <UserLoginForm
                                        onSubmit={this.props.onSubmitUserForm}
                                    />
                                </Tab.Pane>

                                <Tab.Pane eventKey={2}>
                                    <NeighborLoginForm
                                        onSubmit={this.props.onSubmitNeighborForm}
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
}
export default LoginForm;
