import jwt from 'jsonwebtoken';

// Receives an object with parameters
export function CreateAndStoreToken( dataToStore ){
    var token = jwt.sign( dataToStore, GetSecretKey() );
    sessionStorage.setItem( 'token', token );
}

export function VerifyToken( token ){
    try {
        console.log( jwt.verify( token, GetSecretKey() ) );
        return true
    } catch(err) {
        console.log( err );
        return false
    }
}

export function GetUserPermissions( token ){
    var decoded = jwt.verify( token, GetSecretKey() );

    return decoded["level"]
}

export function GetUserRUT( token ){
    var decoded = jwt.verify( token, GetSecretKey() );

    return decoded["user"]
}

export function GetUserPassword( token ){
    var decoded = jwt.verify( token, GetSecretKey() );

    return decoded["password"]
}

export function GetSecretKey(){
    return 'jt65he4ae5ae'
}
