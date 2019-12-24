import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import RequireLogin from './components/Login/RequireLogin';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Neighbors from './pages/Neighbors';
import SendTicket from './pages/SendTicket';
import ViewTickets from './pages/ViewTickets';
import ViewUserTickets from './pages/ViewUserTickets';
import Penalties from './pages/Penalties';
import CommonExpensesPayments from './pages/CommonExpensesPayments';
import CommonExpensesBalance from './pages/CommonExpensesBalance';
import CommonSpaces from './pages/CommonSpaces';
import WaterMeasure from './pages/WaterMeasure';

class App extends Component {
    render(){
        return (
                <RequireLogin
                    appComponent={<Router>
                                    <Navigation />

                                    <div className="page-wrapper">
                                        <Route exact path="/" component={ Dashboard } />
                                        <Route exact path="/Profile" component={ Profile } />
                                        <Route exact path="/Neighbors" component={ Neighbors } />
                                        <Route exact path="/SendTicket" component={ SendTicket } />
                                        <Route exact path="/ViewTickets" component={ ViewTickets } />
                                        <Route exact path="/ViewUserTickets" component={ ViewUserTickets } />
                                        <Route exact path="/Penalties" component={ Penalties } />
                                        <Route exact path="/CommonExpensesPayments" component={ CommonExpensesPayments } />
                                        <Route exact path="/CommonExpensesBalance" component={ CommonExpensesBalance } />
                                        <Route exact path="/CommonSpaces" component={ CommonSpaces } />
                                        <Route exact path="/WaterMeasure" component={ WaterMeasure } />
                                    </div>
                                </Router>}
                />
        );
    }
}
export default App;
