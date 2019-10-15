export function FetchCondominios( id ) {
    var FetchURL = `${APIURL()}/Condominios/${id}`;

    fetch(FetchURL)
    .then(response => response.json())
    .then(resp => {
        return resp.data
    })
    .catch(err => {
        return err
    })
}

export function APIURL(){
    return 'http://192.168.0.17:8080'
}
