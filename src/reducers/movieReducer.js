import { typesMovies } from "../types/types"


const initialState = {
    movies: []
}

export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesMovies.register:
            return {
                movies: [action.payload]
            }
        case typesMovies.list:
            return {
                movies: [...action.payload]
            }
        case typesMovies.update:
            return {
                movies: [...action.payload]
            }
        case typesMovies.delete:
            return {
                movies: state.movies.filter(movie => movie.titulo !== action.payload)
            }
        default:
            return state;
    }
}


