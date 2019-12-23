import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

class CenteredSpinner extends Component {
    render() {
        return (
            <div className="spinner-centered">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Cargando...</span>
                </Spinner>
            </div>
        );
    }
}
export default CenteredSpinner;
