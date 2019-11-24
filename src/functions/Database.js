export function APIURL(){
    return 'https://arq-backend.herokuapp.com'
    // return 'http://192.168.0.17:8080'
}

export function FetchCondominios( id ) {
    var FetchURL = `${APIURL()}/Condominios/${id}/`;
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
    return fetch(`${APIURL()}/Usuarios/${rut}/${pass}`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchDptoLogin( cod, num, pass ){
    return fetch(`${APIURL()}/Departamentos/${cod}/${num}/${pass}`)
    .then(response => response.json())
    .then(resp => {
        return resp
    })
    .catch(err => {
        return err
    })
}

export function FetchUserData( rut, pass ){
    return fetch(`${APIURL()}/Usuarios/${rut}/${pass}`)
    .then(response => response.json())
    .then(resp => {
        return resp.rows[0]
    })
    .catch(err => {
        return err
    })
}
