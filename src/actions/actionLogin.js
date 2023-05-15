import { types } from '../types/types';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { google, facebook } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';

export const logout = () => {
    return (dispatch) => {
        const auth = getAuth();
        signOut(auth)
            .then(user => {
                dispatch(logoutSincrono())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const logoutSincrono = () => {
    return {
        type: types.logout,
        payload: {}
    }
}

export const loginEmailPassword = (email, password) => {

    return (dispatch) => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    loginSincrono(user.uid, user.displayName)
                )
                Swal.fire({
                    icon: 'success',
                    title:'Bienvenido(a) ' + user.displayName + '!'
                })
            })
            .catch(e => {
                alert('Usuario y/o contraseña no existen')
            })
    }
}

export const loginGoogle = () => {

    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, google)
            .then(({ user }) => {
                dispatch(loginSincrono(user.uid, user.displayName))
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export const loginFacebook = () => {

    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, facebook)
            .then(({ user }) => {
                dispatch(loginSincrono(user.uid, user.displayName))
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export const loginSincrono = (id, displayname) => {

    return {
        type: types.login,
        payload: {
            id,
            displayname
        }
    }
}

