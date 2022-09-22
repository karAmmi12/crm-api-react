import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";


/**
 * Déconnexion (suppresion du token dans localStorage)
 */
function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}


//requete HTTP d'authentification et stockage du token dans localStorage et axios

function authenticate(credentials){
    return axios
         .post(LOGIN_API, credentials)
         .then(response => response.data.token)
         .then(token => {
            //je stock le token dans mon localStorage       
            window.localStorage.setItem("authToken", token)
            
            //on prévient axios qu'on a un header par defaut sur toutes nos futures requetes http
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            return true;
         });      
}
//mise en place lors du chargement du token
function setup() {
    // voir si on a un token?
    const token = window.localStorage.getItem("authToken");
    // si le token est encore valide?
    if (token) {
        const jwtData = jwtDecode(token)
        if (jwtData.exp * 1000 > new Date().getTime() ) {
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        }
    }
}
// permet de savoir si on est authentifié ou pas 
function isAuthenticated(){
    // voir si on a un token?
    const token = window.localStorage.getItem("authToken");
    // si le token est encore valide?
    if (token) {
        const jwtData = jwtDecode(token)
        if (jwtData.exp * 1000 > new Date().getTime() ) {
            return true;
        }
        return false;
    }
    return false

}



export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}