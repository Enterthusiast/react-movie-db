// action types
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const UPDATE_MOVIE_LIST = 'UPDATE_MOVIE_LIST'
export const UPDATE_MOVIE_DETAILS = 'UPDATE_MOVIE_DETAILS'
export const CLEAR_MOVIE_DETAILS = 'CLEAR_MOVIE_DETAILS'
export const UPDATE_API_LOADING_STATUS = 'UPDATE_API_LOADING_STATUS'
export const UPDATE_API_ERROR_STATUS = 'UPDATE_API_ERROR_STATUS'
export const UPDATE_API_ERROR_CONFIG_STATUS = 'UPDATE_API_ERROR_CONFIG_STATUS'
export const UPDATE_API_ERROR_DETAILS = 'UPDATE_API_ERROR_DETAILS'

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

export function updateApiLoadingStatus(apiLoadingStatus) {
    return { type: UPDATE_API_LOADING_STATUS, apiLoadingStatus }
}

export function updateApiErrorStatus(apiErrorStatus) {
    return { type: UPDATE_API_ERROR_STATUS, apiErrorStatus }
}

export function updateApiErrorConfigStatus(apiErrorStatus) {
    return { type: UPDATE_API_ERROR_CONFIG_STATUS, apiErrorStatus }
}

export function updateApiErrorDetails(apiErrorDetails) {
    return { type: UPDATE_API_ERROR_DETAILS, apiErrorDetails }
}