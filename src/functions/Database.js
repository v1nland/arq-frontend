export function APIURL(){
    // return 'https://arq-backend.herokuapp.com'
    // return 'http://192.168.0.17:8080'
    return 'http://localhost:8080'
}

export function FetchDataTablesLang(){
    return fetch(`http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchCondominios( id ) {
    var FetchURL = `${APIURL()}/Condominios/byID/${id}/`;
    console.log( FetchURL );

    return fetch(FetchURL)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchUserLogin( rut, pass ){
    var FetchURL = `${APIURL()}/Usuarios/Login/${rut}/${pass}/`;

    return fetch(FetchURL)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchDptoLogin( cod, num, pass ){
    return fetch(`${APIURL()}/Departamentos/Login/${cod}/${num}/${pass}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchDepartamentos(){
    return fetch(`${APIURL()}/Departamentos/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchTickets(){
    return fetch(`${APIURL()}/Tickets/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchTicketsDpto( id ){
    return fetch(`${APIURL()}/Tickets/byDptoID/${id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function InsertNewTicket( id_cond, id_dpto, subject, msg ){
    return fetch(`${APIURL()}/Tickets/Insertar/${id_dpto}/${id_cond}/${msg}/${subject}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchMedicionesAgua(){
    return fetch(`${APIURL()}/MedicionesAgua/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function InsertMedicionAgua( cod_cond, num_dpto, litros ){
    return fetch(`${APIURL()}/MedicionesAgua/Insertar/${litros}/${num_dpto}/${cod_cond}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchMultas(){
    return fetch(`${APIURL()}/Multas/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchPagosGC(){
    return fetch(`${APIURL()}/PagosGC/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchEspaciosComunes(){
    return fetch(`${APIURL()}/EspaciosComunes/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function AnswerTicket( id, msg ){
    return fetch(`${APIURL()}/Tickets/Responder/${id}/${msg}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}
