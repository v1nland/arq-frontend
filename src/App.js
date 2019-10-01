import React, { Component } from 'react';
import { HashRouter, BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Neighbors from './pages/Neighbors';
import SendTicket from './pages/SendTicket';
import ViewTickets from './pages/ViewTickets';
import UploadCommonExpenses from './pages/UploadCommonExpenses';
import CommonExpensesBalance from './pages/CommonExpensesBalance';

class App extends Component {
    render(){
        return (
            <HashRouter>
                <div className="App">
                    <Navigation />

                    <div className="page-wrapper">
                        <Route exact path="/" component={ Dashboard } />
                        <Route exact path="/Profile" component={ Profile } />
                        <Route exact path="/Neighbors" component={ Neighbors } />
                        <Route exact path="/SendTicket" component={ SendTicket } />
                        <Route exact path="/ViewTickets" component={ ViewTickets } />
                        <Route exact path="/UploadCommonExpenses" component={ UploadCommonExpenses } />
                        <Route exact path="/CommonExpensesBalance" component={ CommonExpensesBalance } />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
export default App;
