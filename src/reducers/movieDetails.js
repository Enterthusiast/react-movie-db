import { UPDATE_MOVIE_DETAILS, CLEAR_MOVIE_DETAILS } from '../actions/actions'

const initialState = {}

const movieDetails = function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MOVIE_DETAILS:
            return {
                ...state,
                ...action.movieDetails
            }
        case CLEAR_MOVIE_DETAILS:
            return {}
        default:
            return state
    }
}

export default movieDetails;