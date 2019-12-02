import jwt from 'jsonwebtoken';
import { APIURL } from './Database';

// Returns user token stored in sessionStorage
export function GetUserToken(){
    return sessionStorage.getItem("token");
}

// Verifies if token is valid in API
export function VerifyToken(){
    var FetchURL = `${APIURL()}/DatosUsuario/${GetUserToken()}`;

    return fetch(FetchURL)
    .then(response => response.json())
    .then(resp => {
        return resp.valid === 'true' ? true : false
    })
    .catch(err => {
        return false
    })
}

// Decodes token in API and returns user permissions level
export function GetUserPermissions(){
    var FetchURL = `${APIURL()}/DatosUsuario/${GetUserToken()}`;

    return fetch(FetchURL)
    .then(response => response.json())
    .then(resp => {
        return resp.level
    })
    .catch(err => {
        return err
    })
}

// Decodes token in API and returns user data (id, rut, level)
export function GetUserData(){
    var FetchURL = `${APIURL()}/DatosUsuario/${GetUserToken()}`;

    return fetch(FetchURL)
    .then(response => response.json())
    .then(resp => {
        console.log(resp);
        return resp
    })
    .catch(err => {
        return err
    })
}
