export function APIURL(){
    return 'https://arq-backend.herokuapp.com'
    // return 'http://192.168.0.17:8080'
    // return 'http://localhost:8080'
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

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
export function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(1) + " " + twoDigits(0) + ":" + twoDigits(0) + ":" + twoDigits(0);
};

/////////////////// BEGIN /////////////////////////
/////////////////// CONDOMINIOS ///////////////////
/////////////////// CONDOMINIOS ///////////////////
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

/////////////////// BEGIN ////////////////////////////
/////////////////// USUARIOS ADMIN ///////////////////
/////////////////// USUARIOS ADMIN ///////////////////
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

/////////////////// BEGIN //////////////////////////////
/////////////////// DEPARTAMENTOS ///////////////////
/////////////////// DEPARTAMENTOS ///////////////////
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

export function FetchDepartamentosByID(id){
    return fetch(`${APIURL()}/Departamentos/AllData/byID/${id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function UpdateDepartamentos(id){
    return fetch(`${APIURL()}/Departamentos/${id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

/////////////////// BEGIN /////////////////////
/////////////////// TICKETS ///////////////////
/////////////////// TICKETS ///////////////////
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

export function CountPendingTickets(){
    return fetch(`${APIURL()}/Tickets/CountPending/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

/////////////////// BEGIN /////////////////////////////
/////////////////// MEDICIONES AGUA ///////////////////
/////////////////// MEDICIONES AGUA ///////////////////
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

export function FetchMedicionesAguaByID(id){
    return fetch(`${APIURL()}/MedicionesAgua/byID/${id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function InsertMedicionAgua( cod_cond, num_dpto, litros ){
    console.log( `${APIURL()}/MedicionesAgua/Insertar/${litros}/${num_dpto}/${cod_cond}/` );
    return fetch(`${APIURL()}/MedicionesAgua/Insertar/${litros}/${num_dpto}/${cod_cond}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function UpdateMedicionAgua( fecha, litros, id_dpto ){
    return fetch(`${APIURL()}/MedicionesAgua/Update/${fecha}/${litros}/${id_dpto}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function DeleteMedicionAgua( id ){
    return fetch(`${APIURL()}/MedicionesAgua/Delete/byID/${id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function MonthMedicionesAgua(){
    var cur_month = new Date().getMonth();
    var cur_year = new Date().getFullYear();

    var init_date = new Date(cur_year, cur_month+1, 0).toMysqlFormat()
    var end_date = new Date(cur_year, cur_month+2, 0).toMysqlFormat()

    return fetch(`${APIURL()}/MedicionesAgua/Suma/${init_date}/${end_date}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

/////////////////// BEGIN //////////////////////////////
/////////////////// MULTAS /////////////////////////////
/////////////////// MULTAS /////////////////////////////
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

export function FetchMultasByID(id){
    return fetch(`${APIURL()}/Multas/byID/${id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function InsertMulta( cod_cond, num_dpto, monto, causa ){
    console.log(`${APIURL()}/Multas/Insertar/${cod_cond}/${num_dpto}/${monto}/${causa}/`);
    return fetch(`${APIURL()}/Multas/Insertar/${cod_cond}/${num_dpto}/${monto}/${causa}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function UpdateMulta( fecha, grado, monto, causa, id_dpto, id_mul ){
    console.log(`${APIURL()}/Multas/UpdateMultas/${grado}/${id_dpto}/${monto}/${fecha}/${causa}/${id_mul}/`);
    return fetch(`${APIURL()}/Multas/UpdateMultas/${grado}/${id_dpto}/${monto}/${fecha}/${causa}/${id_mul}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function MonthMultas(){
    var cur_month = new Date().getMonth();
    var cur_year = new Date().getFullYear();

    var init_date = new Date(cur_year, cur_month+1, 0).toMysqlFormat()
    var end_date = new Date(cur_year, cur_month+2, 0).toMysqlFormat()
    console.log(`${APIURL()}/Multas/ContarFecha/${init_date}/${end_date}/`);
    return fetch(`${APIURL()}/Multas/ContarFecha/${init_date}/${end_date}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

/////////////////// BEGIN //////////////////////////////
///////////////////// GC ///////////////////////////////
///////////////////// GC ///////////////////////////////
export function FetchGC(){
    return fetch(`${APIURL()}/GastosComunes/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchGCByDptoID(dpto_id){
    return fetch(`${APIURL()}/GastosComunes/byDptoID/${dpto_id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchSumaGCByDptoID(dpto_id){
    return fetch(`${APIURL()}/GastosComunes/SumabyID/${dpto_id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function InsertGC( cod_cond, num_dpto, monto, detalle ){
    return fetch(`${APIURL()}/GastosComunes/Insertar/${monto}/${detalle}/${num_dpto}/${cod_cond}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

/////////////////// BEGIN /////////////////////////////////
/////////////////// PAGOS GASTOSCOMUNES ///////////////////
/////////////////// PAGOS GASTOSCOMUNES ///////////////////
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

export function FetchPagosGCByID(id){
    return fetch(`${APIURL()}/PagosGC/byID/${id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchPagosGCByDptoID(dpto_id){
    return fetch(`${APIURL()}/PagosGC/byDptoID/${dpto_id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchSumaPagosGCByDptoID(dpto_id){
    return fetch(`${APIURL()}/PagosGC/SumabyID/${dpto_id}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function InsertPagosGC( cod_cond, num_dpto, monto ){
    return fetch(`${APIURL()}/PagosGC/Insertar/${monto}/${num_dpto}/${cod_cond}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function UpdatePagosGC( fecha, monto, id_dpto, id_pago ){
    console.log(`${APIURL()}/PagosGC/Update/${monto}/${fecha}/${id_dpto}/${id_pago}/`);
    return fetch(`${APIURL()}/PagosGC/Update/${monto}/${fecha}/${id_dpto}/${id_pago}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function MonthPagosGC(){
    var cur_month = new Date().getMonth();
    var cur_year = new Date().getFullYear();

    var init_date = new Date(cur_year, cur_month+1, 0).toMysqlFormat()
    var end_date = new Date(cur_year, cur_month+2, 0).toMysqlFormat()

    return fetch(`${APIURL()}/PagosGC/Suma/${init_date}/${end_date}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

/////////////////// BEGIN //////////////////////////////
/////////////////// ESPACIOS COMUNES ///////////////////
/////////////////// ESPACIOS COMUNES ///////////////////
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

export function FetchEspaciosComunesByID(id){
    return fetch(`${APIURL()}/EspaciosComunes/byID/${id}/`)
    .then(response => response.json())
    .then(resp => {
        console.log(resp);
        return resp
    })
    .catch(err => {
        return err
    })
}

export function InsertEspacioComun( nombre, cod_cond, estado, descripcion ){
    return fetch(`${APIURL()}/EspaciosComunes/Insertar/${nombre}/${cod_cond}/${estado}/${descripcion}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function UpdateEspacioComun( nombre, estado, id_cond, descripcion ){
    console.log( `${APIURL()}/EspaciosComunes/Update/${nombre}/${estado}/${descripcion}/${id_cond}/` );
    return fetch(`${APIURL()}/EspaciosComunes/Update/${nombre}/${estado}/${descripcion}/${id_cond}/`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}
