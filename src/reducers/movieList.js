import { UPDATE_MOVIELIST } from '../actions/actions'

const initialState = []

const movieList = function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MOVIELIST:
            return [
                ...action.movieList
            ]
        default:
            return state
    }
}

export default movieList;