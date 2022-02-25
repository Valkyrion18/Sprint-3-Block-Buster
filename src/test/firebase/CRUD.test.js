import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { registerMovieAsync, deleteMovieAsync } from '../../actions/actionMovies'

const middlewares = [thunk]
const mockstore = configureStore(middlewares)

const initState = {
    add: {
        titulo: '',
        calificacion: '',
        fecha_lanzamiento: '',
        sinopsis: ''       
    }
}

const initState2 = {
    delete: {
        titulo: 'Back to the Future'
    }
}

let store = mockstore(initState)
let store2 = mockstore(initState2)

describe('Pruebas con las acciones de Peliculas', () => {
    beforeEach( () => {
        store = mockstore(initState);
        store2 = mockstore(initState2);
    })

    test('Crear Pelicula', async() => {
        await store.dispatch(registerMovieAsync({
            titulo: 'Back to the Future',
            calificacion: '7.5',
            fecha_lanzamiento: '10-07-1986',
            sinopsis: 'Test'  
        }) )
    })
    test('Eliminar Pelicula', async() => {
        // setTimeout(() => {
            await store2.dispatch(deleteMovieAsync({
                titulo: 'Back to the Future', 
            }) )
        // }, 6000)
    })
})