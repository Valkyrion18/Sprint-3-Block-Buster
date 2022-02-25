import '@testing-library/jest-dom';
import { typesMovies } from '../../types/types';
import { movieReducer} from '../../reducers/movieReducer'

describe('Pruebas en Movie Reducer', () => {
    test('Registrar la pelicula', () => { 

        const initState = {
            movies: []
        }
        const action = {
            type: typesMovies.register,
            payload: {
                id: '1',
                displayname: 'Show Time 2'
            }
        };
        const state = movieReducer(initState, action);
        expect(state).toEqual({
            movies: [action.payload]
        })
    })
})