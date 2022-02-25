import '@testing-library/jest-dom';
import { types, typesMovies } from '../../types/types';

describe('Verificar Types', () => {
    test('Comparar propiedades del objeto para hacer Login ', () => { 
        expect(types).toEqual({
            login: 'login',
            logout: 'logout',
            register: 'register',            
        })
    })
    test('Comparar propiedades del objetos para CRUD de Peliculas ', () => { 
        expect(typesMovies).toEqual({
            register: 'Register',
            list: 'List',
            update: 'Update',
            delete: 'Delete'          
        })
    })
})