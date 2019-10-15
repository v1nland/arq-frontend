import jwt from 'jsonwebtoken';

// Receives an object with parameters
export function CreateAndStoreToken( dataToStore, secretKey ){
    var token = jwt.sign( dataToStore, secretKey );
    sessionStorage.setItem('token', token);
}

export function VerifyToken( token, secretKey ){
    try {
        console.log( jwt.verify( token, secretKey ) );
        return true
    } catch(err) {
        console.log( err );
        return false
    }
}

export function GetUserPermissions( token, secretKey ){
    var decoded = jwt.verify( token, secretKey );

    return decoded["level"]
}

export function GetSecretKey(){
    return 'jt65he4ae5ae'
}
