export function APIURL(){
    return 'http://localhost:8080'
}

export function FetchCondominios( id ) {
    var FetchURL = `${APIURL()}/Condominios${id}`;
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
