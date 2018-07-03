// action types
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const UPDATE_MOVIELIST = 'UPDATE_MOVIELIST'

// action creators
export function changePage(pagination) {
    return { type: CHANGE_PAGE, pagination }
}

export function updateMovieList(movieList) {
    return { type: UPDATE_MOVIELIST, movieList }
}