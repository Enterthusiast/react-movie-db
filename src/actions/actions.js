// action types
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const UPDATE_MOVIE_LIST = 'UPDATE_MOVIE_LIST'
export const UPDATE_MOVIE_DETAILS = 'UPDATE_MOVIE_DETAILS'
export const CLEAR_MOVIE_DETAILS = 'CLEAR_MOVIE_DETAILS'

// action creators
export function changePage(pagination) {
    return { type: CHANGE_PAGE, pagination }
}

export function updateMovieList(movieList) {
    return { type: UPDATE_MOVIE_LIST, movieList }
}

export function updateMovieDetails(movieDetails) {
    return { type: UPDATE_MOVIE_DETAILS, movieDetails }
}

export function clearMovieDetails() {
    return { type: CLEAR_MOVIE_DETAILS }
}