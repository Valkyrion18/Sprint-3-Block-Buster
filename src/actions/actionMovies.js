import { typesMovies } from "../types/types";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "@firebase/firestore";

// REGISTRAR NUEVA PELICULA

export const registerMovieAsync = (newMovie) => {

    return (dispatch) => {
        addDoc(collection(db,"moviesDB"),newMovie) 
        .then(resp => {
            dispatch(registerMovieSync(newMovie)) 
            dispatch(listMoviesAsync()) 
        })
        .catch(error => {
            console.log(error);
        })
    }
 }

export const registerMovieSync = (movie) => {
    return{
        type: typesMovies.register,
        payload: movie
    }
}

// LISTAR PELICULAS FAVORITAS

export const listMoviesAsync = () => {
    return async (dispatch) => {

        const querySnapshot = await getDocs(collection(db, "moviesDB")); 
        const peliculas = []; 
        querySnapshot.forEach((doc) => {
            peliculas.push({
                ...doc.data() 
            })
        });
        dispatch(listSync(peliculas)); 
    }
}

export const listSync = (movies) => {
    return {
        type: typesMovies.list,
        payload: movies
    }
}

// ELIMINAR PELICULAS

export const deleteMovieAsync = (title) =>{
    return async(dispatch) => {

        const moviesCollection = collection(db,"moviesDB");
        const q = query(moviesCollection,where("titulo", "==", title)) 
        const datos = await getDocs(q); 

        datos.forEach((docu) => {
            deleteDoc(doc(db,"moviesDB",docu.id));
        })
        dispatch(deleteSync(title));
    }
}

export const deleteSync = (title) => {
    return{
        type: typesMovies.delete,
        payload: title
    }
}

// ACTUALIZAR INFORMACION PELICULAS 

export const updateMovieAsync = (data) => {
    return async(dispatch) => {
        console.log(data.url)
        const moviesCollection = collection(db,"moviesDB");
        const q = query(moviesCollection,where("titulo", "==" ,data.titulo)) 

        const datos = await getDocs(q); 

        datos.forEach((docu) => {
            updateDoc(doc(db,"moviesDB",docu.id), data);
        })
        dispatch(listMoviesAsync());
    }
}


