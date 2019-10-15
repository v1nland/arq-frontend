import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GetUserPermissions, GetSecretKey } from '../../functions/JWT'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBuilding, faTachometerAlt, faUser, faUsers, faTicketAlt, faCreditCard, faBalanceScale } from '@fortawesome/free-solid-svg-icons';

class Navigation extends Component{
    render(){
        return(
            <div className="nav-side-menu">
                <div className="brand">
                    <FontAwesomeIcon icon={faBuilding} fixedWidth /> Te administro &nbsp; &nbsp; &nbsp;
                </div>

                <FontAwesomeIcon className='toggle-btn' icon={faBars} fixedWidth data-toggle="collapse" data-target="#menu-content" />

                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">
                        {
                            GetUserPermissions( sessionStorage.getItem("token"), GetSecretKey() ) === 'admin'?
                            <li>
                                <Link to="/">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faTachometerAlt} fixedWidth /> Escritorio
                                    </div>
                                </Link>
                            </li>
                            :
                            null
                        }


                        <li>
                            <Link to="/Profile">
                                <div className="button-wrapper">
                                    <FontAwesomeIcon icon={faUser} fixedWidth /> Mi Perfil
                                </div>
                            </Link>
                        </li>

                        {
                            GetUserPermissions( sessionStorage.getItem("token"), GetSecretKey() ) === 'admin'?
                            <li>
                                <Link to="/Neighbors">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faUsers} fixedWidth /> Datos vecinos
                                    </div>
                                </Link>
                            </li>
                            :
                            null
                        }

                        {
                            GetUserPermissions( sessionStorage.getItem("token"), GetSecretKey() ) === 'user'?
                            <li>
                                <Link to="/SendTicket">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faTicketAlt} fixedWidth /> Enviar ticket
                                    </div>
                                </Link>
                            </li>
                            :
                            null
                        }

                        {
                            GetUserPermissions( sessionStorage.getItem("token"), GetSecretKey() ) === 'admin'?
                            <li>
                                <Link to="/ViewTickets">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faTicketAlt} fixedWidth /> Ver tickets
                                    </div>
                                </Link>
                            </li>
                            :
                            null
                        }

                        {
                            GetUserPermissions( sessionStorage.getItem("token"), GetSecretKey() ) === 'admin'?
                            <li>
                                <Link to="/UploadCommonExpenses">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faCreditCard} fixedWidth /> Subir gastos comunes
                                    </div>
                                </Link>
                            </li>
                            :
                            null
                        }

                        {
                            GetUserPermissions( sessionStorage.getItem("token"), GetSecretKey() ) === 'admin'?
                            <li>
                                <Link to="/CommonExpensesBalance">
                                    <div className="button-wrapper">
                                        <FontAwesomeIcon icon={faBalanceScale} fixedWidth /> Balance gastos comunes
                                    </div>
                                </Link>
                            </li>
                            :
                            null
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navigation;
